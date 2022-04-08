package com.mintpot.busking.model;

import com.mintpot.busking.model.constant.BuskingViewerStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "busking_viewer")
public class BuskingViewer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private BuskingViewerStatus status;

    @ManyToOne
    @JoinColumn(name = "busking_id", foreignKey = @ForeignKey(name = "FK_busking_viewer_busking"))
    private Busking buskingInfo;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_busking_viewer_user"))
    private User user;

    public BuskingViewer(BuskingViewerStatus status, int buskingId, int userId) {
        this.status = status;
        this.buskingInfo = new Busking(buskingId);
        this.user = new User(userId);
    }
}
