package com.mintpot.carcloth.controller.queryParser;

import com.mintpot.carcloth.utils.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class CriteriaParser {

    private static final Map<String, Operator> ops = Map.of("AND",
                                                            Operator.AND,
                                                            "OR",
                                                            Operator.OR,
                                                            "or",
                                                            Operator.OR,
                                                            "and",
                                                            Operator.AND);

    private final Pattern SpecCriteriaRegex = Pattern.compile("^([\\w.]+?)(" + StringUtils.join("|",
                                                                                                SearchOperation.SIMPLE_OPERATION_SET) + ")(\\p" +
                                                                      "{Punct}?)(\\w+?)" +
                                                                      "(\\p{Punct}?)$",
                                                              Pattern.UNICODE_CHARACTER_CLASS);

    private enum Operator {
        OR(1),
        AND(2);
        final int precedence;

        Operator(int p) {
            precedence = p;
        }
    }

    private boolean isHigherPrecedenceOperator(String currOp, String prevOp) {
        return (ops.containsKey(prevOp) && ops.get(prevOp).precedence >= ops.get(currOp).precedence);
    }

    public Deque<?> parse(String searchParam) {

        var output = new LinkedList<>();
        var stack = new LinkedList<String>();

        Arrays.stream(searchParam.split("\\s+")).forEach(token -> {
            if (ops.containsKey(token)) {
                while (!stack.isEmpty() && isHigherPrecedenceOperator(token, stack.peek()))
                    output.push(stack.pop()
                                     .equalsIgnoreCase(SearchOperation.OR_OPERATOR) ? SearchOperation.OR_OPERATOR : SearchOperation.AND_OPERATOR);
                stack.push(token.equalsIgnoreCase(SearchOperation.OR_OPERATOR) ? SearchOperation.OR_OPERATOR : SearchOperation.AND_OPERATOR);
            } else if (token.equals(SearchOperation.LEFT_PARENTHESIS)) {
                stack.push(SearchOperation.LEFT_PARENTHESIS);
            } else if (token.equals(SearchOperation.RIGHT_PARENTHESIS)) {
                while (!stack.peek()
                             .equals(SearchOperation.LEFT_PARENTHESIS))
                    output.push(stack.pop());
                stack.pop();
            } else {
                Matcher matcher = SpecCriteriaRegex.matcher(token);
                while (matcher.find()) {
                    output.push(
                            new SpecSearchCriteria(matcher.group(1),
                                                   matcher.group(2),
                                                   matcher.group(3),
                                                   matcher.group(4),
                                                   matcher.group(5)
                            )
                    );
                }

                if (output.size() == 0)
                    throw new QueryParseException(QueryParseException.ErrorCode.QURYPRS_QUERY_MATCHES_FAILED);
            }
        });

        while (!stack.isEmpty())
            output.push(stack.pop());

        return output;
    }
}
