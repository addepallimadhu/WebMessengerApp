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
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService uService;
 
    @PostMapping("/")
    public ResponseEntity<?> addUser( @RequestBody User userBody ){

        System.out.println("SENDING USER	 : " + userBody.getUsername());
        uService.addOrUpdateUser(userBody.getUsername(), userBody.getUserdisplayname());
        return new ResponseEntity<>("ADDED / UPDATED SUCCESSFULLY	", HttpStatus.OK);
    }

   @GetMapping("/otherUsers/{myUserName}")
    public ResponseEntity<?> getOtherUsers( @PathVariable("myUserName") String myUserName){

    
        List<User> users = uService.getOtherUsers(myUserName) ;
        return new ResponseEntity<>(users , HttpStatus.OK);
    }

 }
