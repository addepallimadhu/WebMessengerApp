package org.newops.messenger.Model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "message")
@Getter
@Setter
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "sender")
    private String sender;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "message")
    private String message;

    @Column(name = "time")
    private long time;



    public Message(String Sender, String Receiver,String Message){
        this.sender = Sender;
        this.receiver = Receiver;
        this.message = Message;
        this.time = System.currentTimeMillis();
    }

    public Message(Long Id, String Sender, String Receiver,String Message, Long Time){
        this.id = Id;
        this.sender = Sender;
        this.receiver = Receiver;
        this.message = Message;
        this.time = Time;
    }

}
