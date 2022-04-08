package com.mintpot.busking.dto.web.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.web.BuskingDTO;
import com.mintpot.busking.dto.web.response.Busking_BuskingLandDTO;
import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.BuskingType;
import org.springframework.data.domain.Page;

import java.util.Arrays;
import java.util.List;

@JsonPropertyOrder({"listType","listStatus", "page", "size", "sort", "totalElements", "totalPages", "records" })
public class BuskingPageResponseDTO extends PageResponse<BuskingDTO> {

    @JsonProperty("listType")
    private List<BuskingType> listType = Arrays.asList(BuskingType.values());;

    @JsonProperty("listStatus")
    private List<BuskingStatus> listStatus = Arrays.asList(BuskingStatus.values());;

    @JsonProperty("listLand")
    @JsonIgnoreProperties({"city", "address"})
    private List<Busking_BuskingLandDTO>  listLand;

    public BuskingPageResponseDTO(Page<BuskingDTO> page) {
        super(page);
    }
    public BuskingPageResponseDTO(Page<BuskingDTO> page,List<Busking_BuskingLandDTO> listLand) {
        super(page);
        this.listLand = listLand;
    }

    public BuskingPageResponseDTO(List<BuskingDTO> result, int totalPages, long totalElements, int page, int size) {
        super(result, totalPages, totalElements, page, size);
    }
}
