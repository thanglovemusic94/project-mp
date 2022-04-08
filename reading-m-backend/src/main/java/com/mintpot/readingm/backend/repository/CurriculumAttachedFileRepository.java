package com.mintpot.readingm.backend.repository;

import com.mintpot.readingm.backend.entity.clazz.CurriculumAttachedFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CurriculumAttachedFileRepository extends JpaRepository<CurriculumAttachedFile, Long> {

    @Query("select f from CurriculumAttachedFile f where f.senderId = :senderId " +
            " and f.classInfo.id = :classId" +
            " and f.curriculumIndex = :curriculumIndex")
    Optional<CurriculumAttachedFile> findBySenderAndCurriculum(long senderId, long classId, int curriculumIndex);

    @Query("select f from CurriculumAttachedFile f where f.senderId = :senderId" +
        " and (:recipientId is null or f.recipientId = :recipientId)" +
        " and f.classInfo.id = :classId" +
        " and f.curriculumIndex = :curriculumIndex")
    Optional<CurriculumAttachedFile> findByRecipientAndSender(Long recipientId, long senderId, long classId, int curriculumIndex);

    List<CurriculumAttachedFile> findByClassInfo_Id(long classId);
}
