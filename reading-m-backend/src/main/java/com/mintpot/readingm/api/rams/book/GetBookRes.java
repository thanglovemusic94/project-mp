package com.mintpot.readingm.api.rams.book;

import com.mintpot.readingm.backend.entity.Book;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetBookRes {

    private String resultCode;

    private ResultData resultData;

    @Getter
    @Setter
    public static class ResultData {

        private List<Book> Book;

    }
}
