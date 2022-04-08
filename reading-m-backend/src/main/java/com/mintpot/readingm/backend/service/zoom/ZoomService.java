package com.mintpot.readingm.backend.service.zoom;

import com.mintpot.readingm.backend.dto.zoom.CreateZoomMeetingDto;
import com.mintpot.readingm.backend.dto.zoom.MeetingRes;

public interface ZoomService {
    MeetingRes createMeeting(CreateZoomMeetingDto createMeetingDto);

    String joinClass(long classId);

    MeetingRes getDetailMeeting(long meetingId);
}
