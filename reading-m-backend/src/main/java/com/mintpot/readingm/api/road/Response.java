package com.mintpot.readingm.api.road;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Response {

    // full street address
    private String roadFullAddr;

    // Road name address (excluding reference items)
    private String roadAddrPart1;

    // Road name address reference item
    private String roadAddrPart2;

    // lot address
    private String jibunAddr;

    // Road Name Address (English)
    private String engAddr;

    // Zip code
    private String zipNo;

    // Customer input detail address
    private String addrDetail;

    // administrative district code
    private String admCd;

    // road name code
    private String rnMgtSn;

    // Building management number
    private String bdMgtSn;

    // Detailed building name
    private String detBdNmList;

    // building name
    private String bdNm;

    //Whether it is an apartment building (1: apartment house, 0: non-apartment house)
    private String bdkdcd;

    // city name
    private String siNm;

    // city and county name
    private String sggNm;

    //
    // city and county nameEup, Myeon, Dong name
    private String emdNm;

    // legal name
    private String liNm;

    // road name
    private String rn;

    // Whether underground (0: above ground, 1: underground)
    private String udrtYn;

    // building number
    private int buldMnnm;

    // building number
    private int buldSlno;

    // Mountain or not (0: land, 1: mountain)
    private String mtYn;

    // Lot No. (Bungee)
    private int lnbrMnnm;

    // Lot number (number)
    private int lnbrSlno;

    // Eup, Myeon, Dong serial number
    private String emdNo;
}
