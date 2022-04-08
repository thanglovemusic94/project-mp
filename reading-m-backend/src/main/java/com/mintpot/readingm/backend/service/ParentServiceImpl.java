package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.RegParentDto;
import com.mintpot.readingm.backend.dto.tutorApplication.RegStudentDto;
import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.repository.ParentRepository;
import com.mintpot.readingm.backend.repository.StudentRepository;
import com.mintpot.readingm.backend.user.Role;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParentServiceImpl implements ParentService {
    private final ModelMapper mapper;

    private final ParentRepository parentRepository;

    private final StudentRepository studentRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public void registerAccount(RegParentDto dto) {
        Parent parent = mapper.map(dto, Parent.class);
        parent.setPassword(passwordEncoder.encode(dto.getPassword()));
        parent.setRole(Role.PARENT);
        Set<RegStudentDto> children = dto.getChildren();
        Set<Student> students = new HashSet<>();
        if (children != null) {
            students = children.stream()
                    .map(child -> {
                        Student std = mapper.map(child, Student.class);
                        std.setPassword(passwordEncoder.encode(child.getPassword()));
                        std.setRole(Role.STUDENT);
                        std.setParent(parent);
                        return std;
                    })
                    .collect(Collectors.toSet());
        }

        parent.setChildren(students);
        parentRepository.save(parent);
        studentRepository.saveAll(students);
    }
}
