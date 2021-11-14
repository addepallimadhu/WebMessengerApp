package org.newops.messenger.Service;

import org.newops.messenger.Model.User;
import org.newops.messenger.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class UserService extends BaseService {

    @Autowired
    UserRepository uRep;

    public void addOrUpdateUser(){
        
  	User usrdb = uRep.findFirstByUsername(getCurrentUserName());
	if ( usrdb != null) {
                    usrdb.setUserdisplayname(getCurrentUserDisplayName());
                   uRep.save(usrdb);
	}
                  else {
                User usr = new User();
                usr.setUsername(getCurrentUserName());
                usr.setUserdisplayname(getCurrentUserDisplayName());
                uRep.save(usr);
	}

               
    }

  public List<User> getOtherUsers(){
     return uRep.findByUsernameNot(getCurrentUserName());
 }
 
}
