package com.mintpot.readingm.backend.controller;

import com.mintpot.readingm.backend.dto.admin.UserViewDto;
import com.mintpot.readingm.backend.dto.clazz.ClassCartDto;
import com.mintpot.readingm.backend.entity.clazz.ClassCart;
import com.mintpot.readingm.backend.entity.clazz.LiveClass;
import com.mintpot.readingm.backend.entity.id.UserClassId;
import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ClassCartRepository;
import com.mintpot.readingm.backend.repository.ClassRepository;
import com.mintpot.readingm.backend.repository.TutorRepository;
import com.mintpot.readingm.backend.security.AuthenticationFacade;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserRepository;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/classCart")
@Api(tags = {"Class Cart"})
@RequiredArgsConstructor
public class ClassCartController {

    private final ClassCartRepository classCartRepo;

    private final AuthenticationFacade authenticationFacade;

    private final UserRepository userRepo;

    private final ClassRepository classRepo;

    private final TutorRepository tutorRepository;


    private final ModelMapper mapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addToCart(@RequestParam long classId) {
        var classInfo = classRepo.findById(classId)
            .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));
        long userId = authenticationFacade.getAuthentication().getUserId();

        var cart = new ClassCart();
        cart.setClassInfo(classInfo);
        cart.setId(new UserClassId(userId, classId));

        if (classCartRepo.findById(cart.getId()).isPresent()) {
            throw new CommonException(ErrorCode.CLASS_HAS_BEEN_ADDED_TO_CART);
        }

        classCartRepo.save(cart);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void canelCart(@RequestParam Long userId, @RequestParam Long classId) {
        var id = new UserClassId(userId, classId);

        ClassCart cart = classCartRepo.findById(id)
            .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        long user = authenticationFacade.getAuthentication().getUserId();

        if(user != userId) {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }

        classCartRepo.delete(cart);
    }

    @GetMapping
    Page<ClassCartDto> getCarts(@RequestParam(required = false) Long studentId, Pageable page) {

        Long userId = authenticationFacade.getAuthentication().getUserId();
        User user = userRepo.findById(userId).orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_EXIST));

        if (user.getRole() == Role.PARENT) {
            Parent p = (Parent) user;
            Set<Long> children = (p.getChildren() == null ? null
                : p.getChildren().stream().map(m -> m.getId()).collect(Collectors.toSet()));
            if(studentId != null) {
                if(!children.contains(studentId)) {
                    throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
                }
                return classCartRepo.findByUserId(studentId, page)
                    .map(c -> mapperCartDto(c));
            }

            Set<Long> userIds = new HashSet<>();
            userIds.add(userId);

            for (Long id: children) {
                userIds.add(id);
            }

            return classCartRepo.findByListUserId(userIds, page).map(c -> mapperCartDto(c));
        } else if (user.getRole() == Role.STUDENT) {
            Student s = (Student) user;

            if (studentId != null) {
                return classCartRepo.findByUserId(userId, page).map(c -> mapperCartDto(c));
            }

            Set<Long> userIds = new HashSet<>();
            userIds.add(userId);

            if (s.getParent() != null) {
                userIds.add(s.getParent().getId());
            }

            return classCartRepo.findByListUserId(userIds, page).map(c -> mapperCartDto(c));
        } else {
            throw new CommonException(ErrorCode.USER_NOT_ALLOWED);
        }
    }

    private ClassCartDto mapperCartDto(ClassCart c) {
        ClassCartDto cartDto = mapper.map(c, ClassCartDto.class);

        if (c.getClassInfo() instanceof LiveClass) {
            LiveClass liveClass = (LiveClass) c.getClassInfo();
            Tutor tutor = tutorRepository.findById(liveClass.getTutor().getId()).orElseThrow();
            cartDto.getClassInfo().setTutor(mapper.map(tutor, UserViewDto.class));
        }

        return cartDto;
    }
}
