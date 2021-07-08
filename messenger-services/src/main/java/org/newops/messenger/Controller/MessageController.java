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

 // @GetMapping("/{otherUser}")
//   public ResponseEntity<?> getMessages(@PathVariable("otherUser") String otherUser){
      @GetMapping("/")
   public ResponseEntity<?> getMessages(@RequestParam("sender") String Sender,@RequestParam("receiver") String Receiver){
        System.out.println("GETTING CONVERSATION : " + Receiver);
        List<Message> messageOutput = mService.getConversation(Sender,Receiver);
        return new ResponseEntity<>(messageOutput, HttpStatus.OK);
    }
// @RequestParam("sender") String Sender,@RequestParam("receiver") String Receiver,
    @PostMapping("/")
    public ResponseEntity<?> sendMessages( @RequestBody Message messageBody ){

        System.out.println("SENDING MESSAGE : " + messageBody.getSender());
        mService.sendMessage(messageBody.getSender(),messageBody.getReceiver(),messageBody.getMessage());
        return new ResponseEntity<>("SENT SUCCESSFULLY", HttpStatus.OK);
    }

    @GetMapping("/otherUsers/{myUserName}")
    public ResponseEntity<?> getUsers(@PathVariable("myUserName") String myUserName){

     List<String> users = mService.getOtherUsers(myUserName);
     return new ResponseEntity<>(users, HttpStatus.OK);
   }	
}
