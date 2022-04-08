package com.mintpot.readingm.backend;

import com.mintpot.readingm.backend.dto.admin.AdUserExcelDto;
import com.mintpot.readingm.backend.dto.student.StudentDto;
import com.mintpot.readingm.backend.dto.student.StudentProfileDto;
import com.mintpot.readingm.backend.entity.user.Student;
import com.mintpot.readingm.backend.entity.user.Tutor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.parameters.P;

@Configuration
public class ObjectMapperConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

//        PropertyMap<RegTutorAppDto, TutorApplication> tutorAppMap = new PropertyMap<RegTutorAppDto, TutorApplication>() {
//
//            @Override
//            protected void configure() {
//
//                if (source.getBookClassInfo() != null && source.getGoalClassInfo() != null) {
//                    map().getTutor().setTutorType(TutorType.ALL);
//                } else if (source.getBookClassInfo() != null) {
//                    map().getTutor().setTutorType(TutorType.LIVE_BOOK_TEXT);
//                } else if (source.getGoalClassInfo() != null) {
//                    map().getTutor().setTutorType(TutorType.LIVE_GOAL);
//                }
//            }
//        };
//        modelMapper.addMappings(tutorAppMap);

        // TODO implement this for custom mapping
        PropertyMap<Student, StudentDto> studentToDtoMap = new PropertyMap<>() {

            @Override
            protected void configure() {
                map().setParentName(source.getParent().getName());
                map().setParentPhoneNumber(source.getParent().getPhone());
            }
        };

        modelMapper.addMappings(studentToDtoMap);

        PropertyMap<Student, AdUserExcelDto> studentToExcelDtoMap = new PropertyMap<Student, AdUserExcelDto>() {
            @Override
            protected void configure() {
                skip(destination.getGrade());
                skip(destination.getAddress());
            }
        };

        modelMapper.addMappings(studentToExcelDtoMap);

        PropertyMap<Student, StudentProfileDto> studentProfileMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setParentId(source.getParent().getId());
                map().setParentName(source.getParent().getName());
                map().setParentPhone(source.getParent().getPhone());
            }
        };
        modelMapper.addMappings(studentProfileMap);

        return modelMapper;
    }
}
