package org.newops.messenger.Controller;

import org.newops.messenger.Model.Message;
import org.newops.messenger.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    MessageService mService;

    @GetMapping("/")
   public ResponseEntity<?> getMessages(@RequestParam("receiver") String Receiver)
    {
        List<Message> messageOutput = mService.getConversation(Receiver);
        return new ResponseEntity<>(messageOutput, HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<?> sendMessages( @RequestBody Message messageBody )
    {
        mService.sendMessage(messageBody.getReceiver(),messageBody.getMessage());
        return new ResponseEntity<>("SENT SUCCESSFULLY", HttpStatus.OK);
    }
}
