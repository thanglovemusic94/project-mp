package com.mintpot.busking.model;

import com.mintpot.busking.model.constant.PointTransactionType;
import com.mintpot.busking.model.constant.Status;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "point_history")
public class PointHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "point_history_id")
	private Long pointHistoryId;

	private PointTransactionType type;

	private String description;

	private Integer amount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_point_history_user"))
	private User user;

	private String securityInfo1;

	private String securityInfo2;

	@Column(unique = true)
	private String transactionId;

	private Status status;

	@Column(updatable = false)
	@CreationTimestamp
	private Date createdOn;

	@CreationTimestamp
	private Date updateOn;

	public PointHistory(Long pointHistoryId) {
		this.pointHistoryId = pointHistoryId;
	}

	@Builder
	public PointHistory(PointTransactionType transType, String description, Integer amount, User user,
                        String securityInfo1, String securityInfo2) {
		this.type = transType;
		this.description = description;
		this.amount = amount;
		this.user = user;
		this.securityInfo1 = securityInfo1;
		this.securityInfo2 = securityInfo2;
	}

}
