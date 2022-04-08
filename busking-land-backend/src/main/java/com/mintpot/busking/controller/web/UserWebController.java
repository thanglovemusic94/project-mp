package com.mintpot.busking.controller.web;

import com.mintpot.busking.controller.AdminController;
import com.mintpot.busking.dto.AnnouncementDTO;
import com.mintpot.busking.dto.PageResponse;
import com.mintpot.busking.dto.UserRegDto;
import com.mintpot.busking.dto.web.UserDTO;
import com.mintpot.busking.dto.web.request.PasswordWebDto;
import com.mintpot.busking.dto.web.request.UserUpdateDTO;
import com.mintpot.busking.dto.web.response.MessageResponse;
import com.mintpot.busking.model.User;
import com.mintpot.busking.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = {"${settings.cors_origin}"})
@RestController
@RequestMapping(path = "/web/user")
@Api(tags = {"Web User Api"})
@Log4j2
public class UserWebController extends AdminController {


    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    // Change user password
    @ApiOperation("Change user password")
    @PostMapping("/updatePassword")
    public ResponseEntity<?> changeUserPassword(@Valid @RequestBody PasswordWebDto passwordWebDto) {
        userService.changeUserPassword(passwordWebDto);
        return ResponseEntity.ok().body(new MessageResponse("change password success"));
    }

    @ApiOperation("Get All User")
    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public PageResponse<UserDTO> getAll(@RequestParam(defaultValue = "0", required = false) Integer page,
                                        @RequestParam(defaultValue = "10", required = false) Integer size,
                                        @RequestParam(defaultValue = "", required = false) String keyword
    ) {
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<UserDTO> response = userService.findAllBySearch(pageable, keyword);
        return response;
    }


    @ApiOperation("Add User")
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public UserRegDto addUser(@Valid @RequestBody UserRegDto body )
    {
        User user = userService.createUserInWeb(body);
        UserRegDto dto = mapper.map(user, UserRegDto.class);
        return dto;
    }

    @ApiOperation("Get User By Id")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO getUserById(@PathVariable("id") Integer id) {
        UserDTO userDTO = userService.findById(id);
        return userDTO;
    }

    @ApiOperation("Put User by id")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO update(@Valid @RequestBody UserUpdateDTO body, @PathVariable Integer id) {
        return  userService.updateUserInWeb(body, id);
    }

    @ApiOperation("Delete User")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Integer id) {
        userService.delete(id);
    }
}
