package com.mintpot.readingm.api.rams;

import com.mintpot.readingm.api.rams.book.GetBookReq;
import com.mintpot.readingm.api.rams.book.RamsApi;
import com.mintpot.readingm.api.rams.magazine.Magazine;
import com.mintpot.readingm.backend.entity.RamsStudent;
import com.mintpot.readingm.backend.entity.Teacher;
import com.mintpot.readingm.backend.entity.*;
import com.mintpot.readingm.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class SyncRamsSchedule {

    private final RamsApi ramsApi;

    private final BookRepository bookRepo;
    private final CurriculumRepository curriRepo;
    private final NewspaperColumnRepository newspaperColumnRepo;
    private final BookQuizRepository bookQuizRepo;
    private final MagazineRepository magazineRepo;
    private final BranchRepository branchRepo;
    private final RamsTeacherRepository teacherRepo;
    private final RamsStudentRepository studentRepo;
    private final ScheduleRepository scheduleRepo;

    private static final DateFormat simpleDf = new SimpleDateFormat("yyyy-MM");


    //@Scheduled(cron = "0 0 0/3 * * ?", zone = "Asia/Seoul")
    //@Scheduled(fixedDelay = 5*60*1000)
    void syncData() {
        //Triple apiData = ImmutableTriple.of("", "", Curriculum.class);
        /*List<Triple<String, String, Class>> apiData = new ArrayList<>();
        apiData.add(ImmutableTriple.of("/book_list.aspx", "Book", Book.class));
        apiData.add(ImmutableTriple.of("/curri_list.aspx", "Curriculum", Curriculum.class));
        apiData.add(ImmutableTriple.of("/newspaper_c_list.aspx", "Newspaper_c", NewspaperColumn.class));
        apiData.add(ImmutableTriple.of("/bookquiz_list.aspx", "Bookquiz", BookQuiz.class));
        apiData.add(ImmutableTriple.of("/magazine_list.aspx", "Magazine", Magazine.class));
        apiData.add(ImmutableTriple.of("/branch_list.aspx", "Branch", Branch.class));
        apiData.add(ImmutableTriple.of("/teacher_list.aspx", "Teacher", Teacher.class));
        apiData.add(ImmutableTriple.of("/student_list.aspx", "Student", Student.class));
        apiData.add(ImmutableTriple.of("/schedule_list.aspx", "Schedule", Schedule.class));
        apiData.add(ImmutableTriple.of("/schedule_result.aspx", "Schedule", Schedule.class));


        apiData.forEach(triple -> {
            var res = ramsApi.getData(req, triple.getLeft(), triple.getMiddle(), triple.getRight());
        });*/
        final var req = GetBookReq.builder().inBrand("rm").inYyyymm(simpleDf.format(new Date())).build();
        syncBook(req);
        syncCurriculum(req);
        syncNewspaperColumn(req);

        final var branchReq = GetBranchReq.builder().inBrand("rm").inType("1").build();
        syncBranch(branchReq);
        syncTeacher(branchReq);
        syncStudent(branchReq);

        final var scheduleReq = GetScheduleReq.builder().inBrand("rm").inType("1").inToday(LocalDate.now()).build();
        syncScheduleList(scheduleReq);
    }

    private void syncBook(GetBookReq req) {
        var res = ramsApi.getData(req, "/book_list.aspx", "Book", Book.class);
        bookRepo.deleteAll();
        bookRepo.saveAll(res);
    }

    private void syncCurriculum(GetBookReq req) {
        var res = ramsApi.getData(req, "/curri_list.aspx", "Curriculum", Curriculum.class);
        curriRepo.deleteAll();
        curriRepo.saveAll(res);
    }

    private void syncNewspaperColumn(GetBookReq req) {
        var res = ramsApi.getData(req, "/newspaper_c_list.aspx", "Newspaper_c", NewspaperColumn.class);
        newspaperColumnRepo.deleteAll();
        newspaperColumnRepo.saveAll(res);
    }

    private void syncBookQuiz(GetBookReq req) {
        var res = ramsApi.getData(req, "/bookquiz_list.aspx", "Bookquiz", BookQuiz.class);
        bookQuizRepo.deleteAll();
        bookQuizRepo.saveAll(res);
    }

    private void syncMagazine(GetBookReq req) {
        var res = ramsApi.getData(req, "/magazine_list.aspx", "Magazine", Magazine.class);
        magazineRepo.deleteAll();
        magazineRepo.saveAll(res);
    }

    private void syncBranch(GetBranchReq req) {
        var res = ramsApi.getData(req, "/branch_list.aspx", "Branch", Branch.class);
        branchRepo.deleteAll();
        branchRepo.saveAll(res);
    }

    private void syncTeacher(GetBranchReq req) {
        var res = ramsApi.getData(req, "/teacher_list.aspx", "Teacher", Teacher.class);
        teacherRepo.deleteAll();
        teacherRepo.saveAll(res);
    }

    private void syncStudent(GetBranchReq req) {
        var res = ramsApi.getData(req, "/student_list.aspx", "Student", RamsStudent.class);
        studentRepo.deleteAll();
        studentRepo.saveAll(res);
    }

    private void syncScheduleList(GetScheduleReq req) {
        var res = ramsApi.getData(req, "/schedule_list.aspx", "Schedule", Schedule.class);
        scheduleRepo.deleteAll();
        scheduleRepo.saveAll(res);
    }

    private void syncScheduleResult(GetBookReq req) {
        var res = ramsApi.getData(req, "/schedule_result.aspx", "Schedule", Schedule.class);
        scheduleRepo.deleteAll();
        scheduleRepo.saveAll(res);
    }
}
