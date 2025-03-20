package com.launchcode.dama_devs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http)throws Exception{
        //http.csrf(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests((requests)->requests
                //this is for accessing page that the request contains the end point of contact without authorization
                .requestMatchers("/contact").permitAll()
                //.requestMatchers("/hello").hasRole("ADMIN")
                /* this is helpful whenever the application is under maintenance
                deny access to those endpoints and prevent users from interacting
                with then until the maintenance is complete
                we want to reject all the requests coming to our admin dashboard
                because our admin dashboard is under maintenance
                 */
                //.requestMatchers("/admin").denyAll()
                .anyRequest().authenticated());
        //http.formLogin(withDefaults())
       // http.formLogin(form->form.defaultSuccessUrl("/hello",true));
        http.oauth2Login(oauth2 ->
                oauth2.defaultSuccessUrl("http://localhost:5173/dashboard",true));
        http.httpBasic(withDefaults());
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        InMemoryUserDetailsManager manager =new InMemoryUserDetailsManager();
        if(!manager.userExists("user1")) {
            manager.createUser(User.withUsername("user1")
                    .password("{noop}password")
                    .roles("USER")
                    .build());
        }
        if(!manager.userExists("admin")) {
            manager.createUser(User.withUsername("admin")
                    .password("{noop}password1")
                    .roles("ADMIN")
                    .build());
        }
        return manager;
    }
}
