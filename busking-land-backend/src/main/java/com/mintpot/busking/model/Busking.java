package com.mintpot.busking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mintpot.busking.dto.api.BuskingInfoDto;
import com.mintpot.busking.model.constant.BuskingProgress;
import com.mintpot.busking.model.constant.BuskingStatus;
import com.mintpot.busking.model.constant.BuskingType;
import com.mintpot.busking.model.constant.Status;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "busking_info")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Busking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String name;

    private String image;

    @Column(nullable = false)
    private BuskingType type;

    @Column(nullable = false)
    private BuskingStatus status = BuskingStatus.ACTIVE;

    private BuskingProgress progress = BuskingProgress.INIT;

    private Date start;

    private Date end;

    private int durationInMinute;

    private int numberLike;

    private int numberSponsor;

    private int numberViewer;

    private int numberViewerAccumulative = 0;

    @ColumnDefault(value = "false")
    private int isNoticed = 0;

    @Column(unique = true)
    private String channelId;

    private String naverStreamId;

    private String naverStreamUrl;

    private String naverStreamKey;

    @ManyToOne
    @JoinColumn(name = "land_id", foreignKey = @ForeignKey(name = "FK_busking_busking_land"))
    @JsonManagedReference
    private BuskingLand buskingLand;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_busking_user"))
    @JsonManagedReference
    private User user;

    @OneToMany(mappedBy = "buskingInfo", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<BuskingViewer> viewerList;

    public Busking(int id) {
        this.id = id;
    }

    public void addViewerAccumulative () {
        numberViewerAccumulative = numberViewerAccumulative + 1;
    }

    public void addViewer () {
        numberViewer = numberViewer + 1;
    }

    public void removeViewer () {
        numberViewer = numberViewer - 1;
    }

    public void addLike () {
        numberLike = numberLike + 1;
    }

    public void addSponsor (int coin) {
        numberSponsor = numberSponsor + coin;
    }

    public void generateChannelId () {
        String temp = id + "_" + user.getId() + "_" + System.currentTimeMillis();
        if(temp.length() > 20) {
            temp = temp.substring(0, 20);
        }
        channelId = temp;
    }

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updateAt;

    public long getCurrentDuration () {
        return end.getTime() - start.getTime();
    }

}
