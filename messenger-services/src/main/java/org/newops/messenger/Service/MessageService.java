package org.newops.messenger.Service;

import org.newops.messenger.Model.Message;
import org.newops.messenger.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class MessageService {

    @Autowired
    MessageRepository mRep;

    public List<Message> getConversation(String Sender,String Receiver){
      
       List<Message> mergedConversation = new ArrayList<>();
       mergedConversation .addAll(mRep.findBySenderAndReceiver(Sender,Receiver));
       mergedConversation .addAll(mRep.findBySenderAndReceiver(Receiver,Sender));
       return mergedConversation;
//        return mRep.findBySenderAndReceiver(Sender,Receiver);

    }

    public void sendMessage(String Sender, String Receiver,String Message){
        Message msg = new Message(Sender,Receiver,Message);
        mRep.save(msg);
    }

   public List<String> getOtherUsers(String myUserName){
     return mRep.findDistinctBySenderNot(myUserName);
 }
}
