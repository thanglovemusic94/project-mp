package com.mintpot.readingm.api.rams;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResultData<E> {

    private List<E> list;
}
