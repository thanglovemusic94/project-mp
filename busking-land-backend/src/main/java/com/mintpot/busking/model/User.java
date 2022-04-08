package com.mintpot.busking.model;

import com.google.gson.Gson;
import com.mintpot.busking.constant.UserStatus;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user")

public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String email;

	private String password;

	private LocalDate birthday;

	private String name;

	private String avatar;

	private String phone;

	private String performanceVideos;

	@ColumnDefault("'[1, 1]'")
	// pos 0 -> announcement
	// pos 1 -> busking live notice
	private String noticeSetting;

	@ColumnDefault("0")
	@Column(nullable = false)
	private Integer pointAmount = 0;

	@Column(nullable = false)
	private UserStatus status = UserStatus.ACTIVATED;

	@Column(updatable = false)
	@CreationTimestamp
	private Date createdOn;

	@UpdateTimestamp
	private Date updatedOn;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private SNSInfo snsInfo;

//	@OneToOne(mappedBy = "user")
//	private BuskerInfo buskerInfo;

	@ManyToMany
	@JoinTable(name = "User_Favorite"
			, joinColumns = {@JoinColumn(name = "user_id")}
			, inverseJoinColumns = {@JoinColumn(name = "favorite_id")}
			, foreignKey = @ForeignKey(name = "FK_user_favorite_user")
			, inverseForeignKey = @ForeignKey(name = "FK_user_favorite_favorite")
	)

	private Set<Favorite> favorites;

	private boolean agreePolicy = false;

	public User(int userId) {
		this.id = userId;
	}

	public boolean enableNoticeLive () {
		try {
			List<Integer> noticeList = Arrays.asList(new Gson().fromJson(getNoticeSetting(), Integer[].class));
			return noticeList.get(1) == 1;
		} catch (Exception ignored) { }
		return true;
	}

	public boolean enableNoticeAnnouncement () {
		try {
			List<Integer> noticeList = Arrays.asList(new Gson().fromJson(getNoticeSetting(), Integer[].class));
			return noticeList.get(0) == 1;
		} catch (Exception ignored) { }
		return true;
	}
}
