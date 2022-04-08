//package com.mintpot.readingm.backend.validate;
//
//import com.mintpot.readingm.backend.dto.admin.banner.BannerRqDto;
//import org.springframework.stereotype.Component;
//import org.springframework.validation.Errors;
//import org.springframework.validation.Validator;
//import org.springframework.web.multipart.MultipartFile;
//
//@Component
//public class BannerValidator implements Validator {
//
//    @Override
//    public boolean supports(Class<?> aClass) {
//        return BannerRqDto.class.isAssignableFrom(aClass);
//    }
//
//    @Override
//    public void validate(Object o, Errors errors) {
//        BannerRqDto bannerRqDto = (BannerRqDto) o;
//
//        MultipartFile imageMb = bannerRqDto.getImageMb();
//        MultipartFile imagePc = bannerRqDto.getImagePc();
//
//        if (imageMb.getSize() == 0) {
//            errors.rejectValue("imageMb", "banner.file.missing");
//        }
//        if (imagePc.getSize() == 0) {
//            errors.rejectValue("imagePc", "banner.file.missing");
//        }
//
//        if (checkInputString(bannerRqDto.getName())){
//            errors.rejectValue("name", "name.empty");
//        }
//
//        if (bannerRqDto.getOrderBanner().equals(null)){
//            errors.rejectValue("orderBanner", "orderBanner.notnull");
//        }
//    }
//
//    private boolean checkInputString(String input) {
//        return (input == null || input.trim().length() == 0);
//    }
//}
