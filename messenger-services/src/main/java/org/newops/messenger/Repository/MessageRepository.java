package org.newops.messenger.Repository;

import org.newops.messenger.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Void>, JpaSpecificationExecutor<Message> {

    List<Message> findBySenderAndReceiver(String Sender, String Receiver);

    @Query("select new org.newops.messenger.Model.Message(m.id, m.sender, m.receiver, m.message, m.time) from Message m where ((m.sender = ?1 and m.receiver = ?2) or (m.receiver =?1 and m.sender = ?2)) order by m.id asc ")
    List<Message> getConversation(String Sender, String Receiver);

     @Query("select distinct m.sender from Message m where m.sender <> ?1")
     List<String> findDistinctBySenderNot(String Sender); 

}
