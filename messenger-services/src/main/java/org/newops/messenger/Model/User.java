package org.newops.messenger.Model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "userdisplayname")
    private String userdisplayname;

  
    public User(String userName, String userDisplayName){
        this.username = userName ;
        this.userdisplayname = userDisplayName;
      
    }

}
