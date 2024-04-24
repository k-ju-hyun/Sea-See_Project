package safeBeach.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import safeBeach.user.dto.LoginForm;
import safeBeach.user.dto.JoinForm;
import safeBeach.user.entity.Users;
import safeBeach.user.repository.UserRepository;


@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    //로그인 로직
    public Users login(@Validated LoginForm loginForm){
        return userRepository.findByUserIdAndPassword(loginForm.getUserId(), loginForm.getPassword())
                .orElseThrow(() -> new RuntimeException("로그인 정보가 일치하지 않습니다."));
    }

    //회원가입 로직
    public Users join(@Validated JoinForm joinForm){
        if (userRepository.findByUserId(joinForm.getUserId()).isPresent()){
            throw new RuntimeException("이미 사용중인 아이디 입니다.");
        }

        Users users = new Users();
        users.setUserId(joinForm.getUserId());
        users.setPassword(joinForm.getPassword());
        users.setName(joinForm.getName());
        users.setPhone(joinForm.getPhone());
        users.setBirth(joinForm.getBirth());
        userRepository.save(users);
        return  users;
    }

    //중복 아이디 확인 로직
    public boolean checkDuplicateId(String userId){
        return userRepository.existsByUserId(userId);
    }

    //회원탈퇴 로직
    public void deleteUser(String userId){
        if (userRepository.findByUserId(userId).isEmpty()){
            throw new RuntimeException("회원정보가 없습니다.");
        }

        userRepository.deleteByUserId(userId);
    }

    //로그인 로직 (서버 리다이렉션 시)
//    public Users loginServerRedirect(String userId, String password){
//        return userRepository.findByUserId(userId)//#해당 아이디 유저가
//                .filter(m -> m.getPassword().equals(password))//비밀번호 정보가 일치한다면 반환
//                .orElse(null);
//    }


//    //회원가입 로직 (서버 리다이렉션 시)
//    public String signupServerRedirect(String userId, String password, String name, String phone, LocalDate birth){
//        if (userRepository.findByUserId(userId).isPresent()){
//            return "이미 사용중인 아이디 입니다.";
//        }
//
//        Users users = new Users();
//        users.setUserId(userId);
//        users.setPassword(password);
//        users.setName(name);
//        users.setPhone(phone);
//        users.setBirth(birth);
//
//        userRepository.save(users);
//        return "회원가입 완료";
//    }
}
