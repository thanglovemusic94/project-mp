export const CourseStatus = {
    PRE_COURSE: {
        value: "PRE_COURSE",
        label: "수강 전"
    },
    IN_PROGRESS: {
        value: "IN_PROGRESS",
        label: "수강 중"
    },
    COMPLETE: {
        value: "COMPLETE",
        label: "수강완료"
    }
}


export const convertCourseStatus = function (value) {
    if (value === CourseStatus.PRE_COURSE.value) return CourseStatus.PRE_COURSE.label
    if (value === CourseStatus.IN_PROGRESS.value) return CourseStatus.IN_PROGRESS.label
    if (value === CourseStatus.COMPLETE.value) return CourseStatus.COMPLETE.label
    return value
}