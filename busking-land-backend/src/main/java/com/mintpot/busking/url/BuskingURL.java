package com.mintpot.busking.url;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
public class BuskingURL {

    public static final String ID = "/{id}";

    public static final String HOME = "/web/busking";
    public static final String WAIT = "/wait";
    public static final String REJECT = "/reject";
    public static final String APPROVED = "/approved";

}
