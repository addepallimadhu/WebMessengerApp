package org.newops.messenger.Repository;

import org.newops.messenger.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Void>, JpaSpecificationExecutor<Message> {

    List<Message> findBySenderAndReceiver(String Sender, String Receiver);

     @Query("select distinct m.sender from Message m where m.sender <> ?1")
     List<String> findDistinctBySenderNot(String Sender); 

}
