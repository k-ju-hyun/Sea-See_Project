package safeBeach.user.controller;

import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import safeBeach.user.service.UserService;

@Controller
public class UserController {
    private UserService userService;
    private static Logger logger = LoggerFactory.getLogger(UserService.class);

}

