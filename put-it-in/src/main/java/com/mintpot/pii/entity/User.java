package com.mintpot.pii.entity;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mintpot.pii.entity.constant.UserStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql="UPDATE user SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class User extends EntityBase { 

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_generator")
	@SequenceGenerator(name = "user_id_generator", sequenceName = "user_seq")
	private long id;

	@Column(unique = true, nullable = false)
	private String email;

	@Column(nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	@Column(nullable = false)
	private String name;

	/**
	 * Social Security Number
	 */
	private String ssn;

	@Column(nullable = false, unique = true)
	private String phone;

	@Column(nullable = false, columnDefinition = "tinyint(1) default " + UserStatus.Constant.ACTIVATED_VALUE)
	private UserStatus status = UserStatus.ACTIVATED;

	@Column(updatable = false)
	@CreationTimestamp
	private Date createdOn;

	@UpdateTimestamp
	private Date updatedOn;

	@OneToMany(mappedBy = "user")
	private Set<BranchReview> companyReviews;

	@OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL)
	private Set<Inquiry> inquiries;

	@OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.REMOVE)
	private Set<UserCard> cards;

	@OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL)
	private Set<Bookmark> bookmarks;

	public User(long userId) {
		this.id = userId;
	}

	@Builder
	public User(String email, String password, String name, String ssn, String phone) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.ssn = ssn;
		this.phone = phone;
	}

	public void addCardInfo(UserCard card) {
		if(this.cards == null)
			this.cards = new HashSet<>();
		this.cards.add(card);
	}

}
