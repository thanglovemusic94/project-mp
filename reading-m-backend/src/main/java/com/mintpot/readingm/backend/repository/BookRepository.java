package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.dto.clazz.BookCalendarView;
import com.mintpot.readingm.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookRepository extends ExtendedRepository<Book, String>, JpaSpecificationExecutor<Book> {

    @Query("select b from Book b join Curriculum c on b.idx = c.cBookidx where c.cIdx = :cIdx order by b.idx")
    List<Book> getBookByCurriculum(String cIdx);

    @Query(value = "select b.idx , b.title, b.publisher, b.writer, b.grade, b.clazz as school, b.image " +
        "from class_student cs " +
        "join class c on c.id = cs.class_id " +
        "join text_book_class_curriculum tbcc on tbcc.text_book_class_id = c.id " +
        "  and ((:start < tbcc.start and tbcc.start < :end) " +
        "    or (:start < tbcc.end and tbcc.end < :end)) " +
        "join book b on b.idx = tbcc.book_id " +
        "where cs.student_id = :userId " +
        "GROUP BY b.idx", nativeQuery = true)
    List<BookCalendarView> getBooksCalendarByUser(Long userId, LocalDateTime start, LocalDateTime end);
}