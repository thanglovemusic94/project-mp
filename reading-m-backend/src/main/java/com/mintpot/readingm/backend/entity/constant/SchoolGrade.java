package com.mintpot.readingm.backend.entity.constant;

public enum SchoolGrade {
    G1(SchoolStage.PRIMARY),
    G2(SchoolStage.PRIMARY),
    G3(SchoolStage.PRIMARY),
    G4(SchoolStage.PRIMARY),
    G5(SchoolStage.PRIMARY),
    G6(SchoolStage.PRIMARY),
    G7(SchoolStage.SECONDARY),
    G8(SchoolStage.SECONDARY),
    G9(SchoolStage.SECONDARY);

    private final SchoolStage stage;

    SchoolGrade(SchoolStage stage) {
        this.stage = stage;
    }

    public SchoolStage getStage() {
        return this.stage;
    }
}
