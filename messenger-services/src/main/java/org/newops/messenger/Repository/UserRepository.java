package org.newops.messenger.Repository;

import org.newops.messenger.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Void>, JpaSpecificationExecutor<User> {

  User findFirstByUsername(String UserName);
  List<User> findByUsernameNot(String myUserName);

}
