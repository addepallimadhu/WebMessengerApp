package org.newops.messenger.Service;

import org.newops.messenger.Model.Message;
import org.newops.messenger.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService extends BaseService{

    @Autowired
    MessageRepository mRep;

    public List<Message> getConversation(String Receiver){
       return mRep.getConversation(getCurrentUserName(),Receiver) ;

    }

    public void sendMessage( String Receiver,String Message){
        Message msg = new Message(getCurrentUserName(),Receiver,Message);
        mRep.save(msg);
    }
}
