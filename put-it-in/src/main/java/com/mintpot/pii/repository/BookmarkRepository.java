package com.mintpot.pii.repository;

import com.mintpot.pii.entity.Bookmark;
import com.mintpot.pii.entity.User;
import com.mintpot.pii.entity.id.UserBranchId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BookmarkRepository extends PagingAndSortingRepository<Bookmark, UserBranchId> {
    Page<Bookmark> findAllByUser(User user, Pageable pageable);
}
