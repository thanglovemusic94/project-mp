package com.mintpot.readingm.backend.dto.admin;

import com.mintpot.readingm.backend.entity.tutorApplication.Certificate;

import java.util.Optional;
import java.util.Set;

public interface AdTutorApplicationDetailsView extends AdTutorApplicationView {

    String getIntroduction();

    Optional<Set<Certificate>> getCerts();
}
