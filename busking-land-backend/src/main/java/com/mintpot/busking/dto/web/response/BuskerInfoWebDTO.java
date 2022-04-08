package com.mintpot.busking.dto.web.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuskerInfoWebDTO {
    private String name;
    private String activityCity;
    private String performanceVideos;
    private Busker_UserDTO user;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdOn;
}
