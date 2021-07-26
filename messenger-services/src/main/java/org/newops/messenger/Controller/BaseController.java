package org.newops.messenger.Controller;
import org.newops.messenger.Model.User;
import org.newops.messenger.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/api")
public class BaseController {

    @GetMapping("/")
    public ResponseEntity<?> healthCheck() {
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}
