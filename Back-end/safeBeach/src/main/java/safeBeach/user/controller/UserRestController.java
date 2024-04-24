package safeBeach.user.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import safeBeach.user.dto.LoginForm;
import safeBeach.user.dto.JoinForm;
import safeBeach.user.entity.Users;
import safeBeach.user.service.UserService;

import java.util.Map;

@RestController
public class UserRestController {

    private UserService userService;

    public UserRestController(UserService userService){
        this.userService = userService;
    }


    @PostMapping("/login")//로그인
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm, HttpSession session){
        try {
            Users users = userService.login(loginForm);
            session.setAttribute("userId", users.getUserId());//세션 생성
            return ResponseEntity.ok(users);
        } catch (RuntimeException e) {//서비스 레이어에서 예외가 발생하면
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/check-login")//로그인 확인
    public ResponseEntity<?> checkLogin(HttpSession session) {
        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            return ResponseEntity.ok(userId);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")//로그아웃
    public ResponseEntity<?> logout(HttpSession session){
        if (session != null) { session.invalidate(); }//세션 무효화
        return ResponseEntity.ok().build();
    }

    @PostMapping("/join")//회원가입
    @Transactional
    public ResponseEntity<?> join(@RequestBody JoinForm joinForm, HttpSession session){
        try {
            Users users = userService.join(joinForm);
            session.setAttribute("users", users);//세션 생성
            return ResponseEntity.ok(users);
        } catch (RuntimeException e) {//서비스 레이어에서 예외가 발생하면
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/checkDuplicateId/{userId}")//중복 아이디 체크
    @Transactional
    public ResponseEntity<?> checkDuplicateId(@PathVariable String userId){
        boolean duplicate = userService.checkDuplicateId(userId);
        return ResponseEntity.ok().body(Map.of("duplicate", duplicate));
    }

    @DeleteMapping("/withdraw/{userId}")//회원삭제
    @Transactional
    public ResponseEntity<String> deleteUser(@PathVariable String userId, HttpSession session) {
        try {
            userService.deleteUser(userId);
            session.invalidate();
            return ResponseEntity.ok("회원 탈퇴 완료");
        } catch (RuntimeException e) {//서비스 레이어에서 예외가 발생하면
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
