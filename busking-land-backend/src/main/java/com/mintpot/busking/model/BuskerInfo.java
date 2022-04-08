package com.mintpot.busking.model;

import com.mintpot.busking.model.constant.BuskerStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_busker_info")
public class BuskerInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String activityCity;

    private String avatar;

    private String performanceVideos;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Busker_Favorite"
            , joinColumns = {@JoinColumn(name = "busker_id")}
            , inverseJoinColumns = {@JoinColumn(name = "favorite_id")}
            , foreignKey = @ForeignKey(name = "FK_busker_favorite_busker")
            , inverseForeignKey = @ForeignKey(name = "FK_busker_favorite_favorite")
    )
    private Set<Favorite> favorites;

    private BuskerStatus status = BuskerStatus.IN_ACTIVE;

    @OneToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_busker_info_user"))
    private User user;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;

    public void setListFavoriteId(List<Favorite> favoriteId) {
        this.favorites = new HashSet<>(favoriteId);
    }

}
