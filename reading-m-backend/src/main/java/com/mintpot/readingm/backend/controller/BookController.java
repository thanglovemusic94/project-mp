package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.clazz.BookCalendarView;
import com.mintpot.readingm.backend.entity.Book;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.BookRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@Api(tags = {"Book"})
@RequiredArgsConstructor
public class BookController {

    private final BookRepository bookRepo;

    @GetMapping
    @ApiOperation(value="API get all books")
    List<Book> getAllBooks(@RequestParam(required = false) Specification<Book> query, Sort sort) {

        return bookRepo.findAll(query, sort);
    }

    @GetMapping("/{id}")
    @ApiOperation(value="API for 9-3 & 9-3-1")
    Book getDetail(@PathVariable String id) {
        return bookRepo.findById(id).orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @GetMapping("/{userId}/calendar")
    @ApiOperation(value="API for 7-6 & 8-3: parameter month(yyyy.MM)")
    List<BookCalendarView> getBooksCalendarByUser(@PathVariable Long userId,
                                                  @RequestParam(required = false) String month) {
        LocalDate date;

        if(!Strings.isBlank(month)) {
            DateTimeFormatter fmt = new DateTimeFormatterBuilder()
                .appendPattern("yyyy.MM")
                .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                .toFormatter();
            date = LocalDate.parse(month, fmt);
        } else {
            date = LocalDate.now();
        }

        LocalDateTime start = LocalDateTime.of(date.withDayOfMonth(1), LocalTime.of(0, 0, 0));
        LocalDateTime end = LocalDateTime.of(date.withDayOfMonth(date.lengthOfMonth()), LocalTime.of(23, 59, 59));

        List<BookCalendarView>  books = bookRepo.getBooksCalendarByUser(userId, start, end);

        return books;
    }
}
