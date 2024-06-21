package org.newops.messenger.Config;

import org.newops.messenger.Model.User;
import org.newops.messenger.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppStartupRunner {
    @Autowired
    UserRepository uRep;

    public AppStartupRunner() {

    }

    @Bean
    public CommandLineRunner runner() {

        User usr = new User();
        usr.setUsername("ADMIN");
        usr.setUserdisplayname("Administrator");
        return args -> uRep.save(usr);
    }
}