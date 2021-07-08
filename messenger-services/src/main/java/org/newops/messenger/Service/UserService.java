package org.newops.messenger.Service;

import org.newops.messenger.Model.User;
import org.newops.messenger.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class UserService {

    @Autowired
    UserRepository uRep;

       
   public void addOrUpdateUser(String UserName, String UserDisplayName){
        
  	User usrdb = uRep.findFirstByUsername(UserName);
	if ( usrdb != null) {
                    usrdb.setUserdisplayname(UserDisplayName);
                   uRep.save(usrdb);
	}
                  else {
                User usr = new User();
                usr.setUsername(UserName);
                usr.setUserdisplayname(UserDisplayName);
                uRep.save(usr);
	}

               
    }

  public List<User> getOtherUsers(String myUserName){
     return uRep.findByUsernameNot(myUserName);
 }
 
}
