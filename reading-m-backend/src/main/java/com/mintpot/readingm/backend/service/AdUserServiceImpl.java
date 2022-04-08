package com.mintpot.readingm.backend.service;

import com.mintpot.readingm.backend.dto.admin.AdMemListDto;
import com.mintpot.readingm.backend.dto.admin.AdUserExcelDto;
import com.mintpot.readingm.backend.dto.admin.ParentDto;
import com.mintpot.readingm.backend.dto.admin.TutorDto;
import com.mintpot.readingm.backend.dto.student.StudentDto;
import com.mintpot.readingm.backend.entity.constant.TutorType;
import com.mintpot.readingm.backend.entity.user.Address;
import com.mintpot.readingm.backend.entity.user.Parent;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.entity.user.Tutor;
import com.mintpot.readingm.backend.exception.CommonException;
import com.mintpot.readingm.backend.exception.ErrorCode;
import com.mintpot.readingm.backend.repository.ParentRepository;
import com.mintpot.readingm.backend.repository.StudentRepository;
import com.mintpot.readingm.backend.repository.TutorRepository;
import com.mintpot.readingm.backend.user.Role;
import com.mintpot.readingm.backend.user.User;
import com.mintpot.readingm.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdUserServiceImpl implements AdUserService {
    private final StudentRepository studentRepository;

    private final ParentRepository parentRepository;

    private final TutorRepository tutorRepository;

    private final UserRepository userRepository;

    private final ExcelService excelService;

    private final ModelMapper mapper;

    @Override
    public AdMemListDto  getDetailMember(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.ENTITY_NOT_FOUND));

        if (user instanceof Student) {
            return mapper.map(user, StudentDto.class);
        } else if (user instanceof Parent) {
            return mapper.map(user, ParentDto.class);
        } else if (user instanceof Tutor) {
            return mapper.map(user, TutorDto.class);
        }

        return mapper.map(user, AdMemListDto.class);
    }

    @Override
    public Page<AdMemListDto> getMemberList(TutorType tutorType, Role memberType, Date signupFrom, Date signupTo, String term, Pageable page) {
        if (signupTo != null) {
            signupTo = new Date(signupTo.getTime() + 1000L*(23*60*60 + 59*60 + 59)); // add 23h59'59"
        }

        if (tutorType != null && tutorType != TutorType.ALL) {
            return tutorRepository.getMemberList(tutorType, signupFrom, signupTo, term, page)
                    .map(tutor -> mapper.map(tutor, AdMemListDto.class));
        } else {
            if (memberType == Role.STUDENT) {
                return studentRepository.getMemberList(signupFrom, signupTo, term, page)
                        .map(student -> mapper.map(student, AdMemListDto.class));
            } else if (memberType == Role.PARENT) {
                return parentRepository.getMemberList(signupFrom, signupTo, term, page)
                        .map(parent -> mapper.map(parent, AdMemListDto.class));
            } else if (memberType == Role.TUTOR) {
                return tutorRepository.getMemberList(null, signupFrom, signupTo, term, page)
                        .map(tutor -> mapper.map(tutor, AdMemListDto.class));
            }
        }

        return userRepository.getMemberList(signupFrom, signupTo, term, page)
                .map(this::convertUserToDto);
    }

    @Override
    public byte[] exportMembers(List<Long> ids) throws Exception {
        var users = userRepository.findAllById(ids);
        Workbook wb = new XSSFWorkbook();
        addSheetData(wb, users, Role.STUDENT);
        addSheetData(wb, users, Role.PARENT);
        addSheetData(wb, users, Role.TUTOR);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        wb.write(outputStream);
        return outputStream.toByteArray();
    }

    @Override
    public List<? extends User> transformUserByRole(List<User> users, Role role) {
        final java.lang.Class<? extends User> resultClass;

        if (role == Role.STUDENT) {
            resultClass = Student.class;
        } else if (role == Role.PARENT) {
            resultClass = Parent.class;
        } else if (role == Role.TUTOR) {
            resultClass = Tutor.class;
        } else {
            resultClass = User.class;
        }

        if (resultClass.equals(User.class)) {
            return users;
        }

        return users.stream()
                .filter(u -> u.getRole() == role)
                .map(u -> mapper.map(u, resultClass))
                .collect(Collectors.toList());
    }

    private void addSheetData(Workbook wb, List<User> users, Role role) throws Exception {
        var data = transformUserByRole(users, role);

        if (data.size() > 0) {
            var dtos = data.stream()
                    .map(u -> userToExcelDto(u))
                    .collect(Collectors.toList());

            excelService.addSheet(wb, role.name(), mapHeaders(role), dtos);
        }
    }

    private AdMemListDto convertUserToDto(User user) {
        AdMemListDto dto = mapper.map(user, AdMemListDto.class);
        if (user.getRole() == Role.STUDENT) {
            Student student = studentRepository.getOne(user.getId());
            dto.setGrade(student.getGrade());
            dto.setClazz(student.getClazz());
        } else if (user.getRole() == Role.TUTOR) {
            Tutor tutor = tutorRepository.getOne(user.getId());
            dto.setTutorType(tutor.getTutorType());
        }
        return dto;
    }

    private LinkedHashMap<String, String> mapHeaders(Role role) {
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        map.put("구분", "classSource");
        map.put("가입 유형", "role");
        map.put("이름", "name");
        map.put("ID", "memberId");
        map.put("휴대폰 번호", "phone");
        map.put("이메일", "email");
        map.put("주소", "address");
        map.put("수신 동의 여부", "receivedSms");

        if (role == Role.STUDENT) {
            map.put("학교", "school");
            map.put("학년", "grade");
            map.put("학부모 이름", "parentName");
            map.put("학부모 휴대폰 번호", "parentPhone");

        } else if (role == Role.PARENT) {
            map.put("자녀 이름", "child1Name");
            map.put("자녀 ID", "child1Id");
            map.put("자녀 학교", "child1School");
            map.put("자녀 학년", "child1Grade");
            map.put("자녀 이름2", "child2Name");
            map.put("자녀 ID2", "child2Id");
            map.put("자녀 학교2", "child2School");
            map.put("자녀 학년2", "child2Grade");
        } else if (role == Role.TUTOR) {
            map.put("은행", "bank");
            map.put("계좌번호", "bankAccount");
            map.put("지도교사 유형", "tutorType");
        }
        return map;
    }

    private String convertStudentGrade(int grade) {
        return "Grade " + grade;
    }

    private String convertAddress(Address address) {
        return address.getAddressDetail() + " - " + address.getRoadName();
    }

    private AdUserExcelDto userToExcelDto(User user) {
        var dto = mapper.map(user, AdUserExcelDto.class);
        dto.setAddress(convertAddress(user.getAddress()));

        if (user instanceof Student) {
            Student std = (Student) user;
            dto.setGrade(convertStudentGrade(std.getGrade()));
            dto.setParentName(std.getParent().getName());
            dto.setParentPhone(std.getParent().getPhone());
        } else if (user instanceof Parent) {
            Parent parent = (Parent) user;
            var students = new ArrayList<>(parent.getChildren());
            for (int i = 0; i < students.size(); i++) {
                var std = students.get(i);
                if (i == 0) {
                    dto.setChild1Name(std.getName());
                    dto.setChild1Grade(convertStudentGrade(std.getGrade()));
                    dto.setChild1Id(std.getMemberId());
                    dto.setChild1School(std.getSchool());
                } else if (i == 1) {
                    dto.setChild2Name(std.getName());
                    dto.setChild2Grade(convertStudentGrade(std.getGrade()));
                    dto.setChild2Id(std.getMemberId());
                    dto.setChild2School(std.getSchool());
                }
            }

        }
        return dto;
    }
}
