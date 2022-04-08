package com.mintpot.busking.dto.web.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@JsonRootName(value = "dashboard", namespace = "hihi")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardWebDTO {
    private long live_count;
    private long offline_count;
    private long total_user_count;
    private long exchange_count;
}
