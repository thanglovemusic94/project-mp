package com.mintpot.busking.dto.web.request;

import com.mintpot.busking.dto.web.response.Busker_UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor



public class BuskerInfoDTOEdit {
    private String name;
    private String activityCity;
    private List<String> performanceVideos;
    private Busker_UserDTO user;
    private Date createdOn;
}
