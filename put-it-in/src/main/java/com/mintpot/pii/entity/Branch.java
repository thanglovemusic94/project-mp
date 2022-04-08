package com.mintpot.pii.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mintpot.pii.dto.ProductTwoDto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mintpot.pii.entity.constant.CrudStatus;
import com.mintpot.pii.repository.projection.ReviewPrj;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(name = "UK_branch_code", columnNames = {"code", "company_id"})
)
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(BranchEntityListener.class)
@SQLDelete(sql="UPDATE branch SET crud_status = 1 WHERE id = ?")
@Where(clause = "crud_status = 0")
public class Branch extends EntityBase { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(updatable = false)
    private String code;

    private String name;

    private String addressSimple;

    private String addressDetailed;

    private Point location;

    private String phone;
    
    private String announcement;    // linhnc add miss column 11-1-2021
    private CrudStatus crudStatus = CrudStatus.CREATED;
    
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String businessInfo;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String refundPolicy;

    //@Formula("select count(id) from branch_review br where br.branch_id = id")
    @Transient
    private int reviewsNo;

    //@Formula("select count(id) from branch_review br where br.branch_id = id")
    @Transient
    private float avgRating;

    private String mainPhotoUrl;

    @ElementCollection
    private List<String> subPhotoUrls;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToMany(mappedBy = "branch", orphanRemoval = true, cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<BranchReview> branchReviews;

    @OneToMany(mappedBy = "branch", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Product> products;   
    
    //linhNC add productTwo for search branch order by price of Product
    @Transient
    private List<ProductTwoDto> productTwo;

    @OneToMany(mappedBy = "branch", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private Set<Bookmark> bookmarks;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
//    @ManyToMany(cascade = { CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "branch_keyword",
            joinColumns = @JoinColumn(name = "branch_id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id")
            ,foreignKey = @ForeignKey(name = "FK_branch_branch_keyword"),
            inverseForeignKey = @ForeignKey(name = "FK_keyword_branch_keyword")
    )
    private Set<Keyword> keywords;

    /*@ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "branch_tag",
            joinColumns = {@JoinColumn(name = "branch_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")}
            , foreignKey = @ForeignKey(name = "FK_branch_tag_branch")
            , inverseForeignKey = @ForeignKey(name = "FK_branch_branch_tag")
    )
    private Set<Tag> tags;*/

    public void addProduct(Product product) {
        if (this.products == null)
            this.products = new HashSet<>();
        this.products.add(product);
    }

    public void addKeyword(Keyword keyword) {
        if (this.keywords == null)
            this.keywords = new HashSet<>();
        this.keywords.add(keyword);
    }

    public void setReviewInfo(ReviewPrj rvPrj) {
        this.avgRating = rvPrj.getAvgRating();
        this.reviewsNo = rvPrj.getReviewsNo();
    }

    public Branch(long branchId) {
        this.id = branchId;
    }

    @Builder
    public Branch(String name, String addressSimple, String addressDetailed, Point location, String phone,
                  String businessInfo,
                  String refundPolicy, int reviewsNo, int avgRating, String mainPhotoUrl, List<String> subPhotoUrls,
                  Company company, Set<BranchReview> branchReviews, Set<Product> products, Set<Bookmark> bookmarks,
                  Set<Keyword> keywords
    ) {
        this.name = name;
        this.addressSimple = addressSimple;
        this.addressDetailed = addressDetailed;
        this.location = location;
        this.phone = phone;
        this.businessInfo = businessInfo;
        this.refundPolicy = refundPolicy;
        this.reviewsNo = reviewsNo;
        this.avgRating = avgRating;
        this.mainPhotoUrl = mainPhotoUrl;
        this.subPhotoUrls = subPhotoUrls;
        this.company = company;
        this.branchReviews = branchReviews;
        this.products = products;
        this.bookmarks = bookmarks;
        this.keywords = keywords;
    }
}
