package com.mintpot.pii.service.impl;

import com.mintpot.pii.dto.BranchReviewDto;
import com.mintpot.pii.entity.*;
import com.mintpot.pii.entity.id.UserBranchId;
import com.mintpot.pii.exception.BusinessException;
import com.mintpot.pii.exception.error.ErrorCode;
import com.mintpot.pii.facade.AuthenticationFacade;
import com.mintpot.pii.repository.BranchReviewRepository;
import com.mintpot.pii.repository.ProductRepository;
import com.mintpot.pii.repository.ReservationRepository;
import com.mintpot.pii.repository.UserRepository;
import com.mintpot.pii.service.BranchReviewService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class BranchReviewServiceImpl implements BranchReviewService {

    private static final String UPLOADED_FOLDER = "src/main/resources/static/review-images/";
    private static final String URL_PATH = "/review-images/";
    private static final List<String> contentTypes = Arrays.asList("image/png", "image/jpeg", "image/gif");

    private final ProductRepository productRepo;
    private final UserRepository userRepo;
    private final BranchReviewRepository branchReviewRepo;
    private final AuthenticationFacade authFacade;
    private final ReservationRepository reservationRepo;
    private final ModelMapper modelMapper;

    public BranchReviewServiceImpl(ProductRepository productRepo, UserRepository userRepo, BranchReviewRepository branchReviewRepo, AuthenticationFacade authFacade, ReservationRepository reservationRepo, ModelMapper modelMapper) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.branchReviewRepo = branchReviewRepo;
        this.authFacade = authFacade;
        this.reservationRepo = reservationRepo;
        this.modelMapper = modelMapper;
    }

    public void createReview(BranchReviewDto branchReviewDto, MultipartFile photo) {
        Reservation reservation = reservationRepo.findById(branchReviewDto.getReservationId())
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        Product product = productRepo.findDetailsById(reservation.getProduct().getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        User user = userRepo.findById(authFacade.getAuthentication().getUserId())
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        UserBranchId brachReviewId = new UserBranchId(user.getId(), product.getBranch().getId(), reservation.getId());
        Optional<BranchReview> existedReview= branchReviewRepo.findById(brachReviewId);
        if(existedReview.isPresent()){
            throw new BusinessException(ErrorCode.REVIEW_EXISTED);
        }

        BranchReview branchReview = BranchReview.builder()
                .branchId(product.getBranch().getId())
                .userId(user.getId())
                .reservationId(reservation.getId())
                .contents(branchReviewDto.getContents())
                .rating(branchReviewDto.getRating())
                .build();
        branchReviewRepo.save(branchReview);

        if(photo!=null) {
            uploadReviewImage(photo, branchReview);
        }
    }

    private void uploadReviewImage(MultipartFile uploadImage, BranchReview branchReview) {
        try {
            if (!uploadImage.isEmpty()) {
                String fileContentType = uploadImage.getContentType();
                if (contentTypes.contains(fileContentType)) {
                    File file = new File(UPLOADED_FOLDER);
                    if (!file.exists()) {
                        file.mkdir();
                    }
                    byte[] bytes = uploadImage.getBytes();
                    Path path = Paths.get(UPLOADED_FOLDER + uploadImage.getOriginalFilename());
                    Files.write(path, bytes);
                    System.out.println("You successfully uploaded !");
                    branchReview.setPhotoUrl(URL_PATH + uploadImage.getOriginalFilename());
                    branchReviewRepo.save(branchReview);
                } else {
                    throw new BusinessException(ErrorCode.VALIDATION_FAILED);
                }
            }
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
