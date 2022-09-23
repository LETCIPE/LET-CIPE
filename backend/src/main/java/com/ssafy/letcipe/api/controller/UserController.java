package com.ssafy.letcipe.api.controller;

import com.ssafy.letcipe.api.dto.user.*;
import com.ssafy.letcipe.api.service.JwtService;
import com.ssafy.letcipe.api.service.UserService;
import com.ssafy.letcipe.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Pageable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    private final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @PostMapping("")
    public ResponseEntity createUser(@RequestBody ReqPostUserDto requestDto) throws NoSuchAlgorithmException {
        userService.createUser(requestDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("login")
    public ResponseEntity loginUser(@RequestBody ReqLoginUserDto requestDto) throws NoSuchAlgorithmException {
        User user = userService.loginUser(requestDto);
        String token = jwtService.createToken(user);

        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("access-token", token);

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("")
    public ResponseEntity readUser(HttpServletRequest request){
        Long userId = jwtService.getUserId(request);
        ResGetUserDto resDto = userService.readUser(userId);
        return ResponseEntity.ok(resDto);
    }

    @PatchMapping("")
    public ResponseEntity deleteUser(HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("")
    public ResponseEntity updateUser(@RequestBody ReqPutUserDto requestDto, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        userService.updateUser(userId, requestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("recipe")
    public ResponseEntity readUserRecipe(HttpServletRequest request, Pageable pageable){
        Long userId = jwtService.getUserId(request);
        return ResponseEntity.ok(userService.readUserRecipe(userId, pageable));
    }
}
