package com.mintpot.busking.dto.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mintpot.busking.dto.web.response.Busker_UserDTO;
import com.mintpot.busking.model.Favorite;
import com.mintpot.busking.model.User;
import com.mintpot.busking.model.constant.BuskerStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuskerInfoDTO {
    private int id;
    private String name;
    private String activityCity;
    private String avatar;
    private String performanceVideos;
    private Set<Favorite> favorites;
    private BuskerStatus status;
    private Busker_UserDTO user;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdOn;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date updatedOn;

}
