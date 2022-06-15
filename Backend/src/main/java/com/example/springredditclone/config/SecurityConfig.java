package com.example.springredditclone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {
////        httpSecurity.csrf().disable()
////                .authorizeRequests()
////                .antMatchers(HttpMethod.OPTIONS, "/**", "/h2-console/**").permitAll()
////                .anyRequest().authenticated()
////                .and()
////                .httpBasic();
//
        httpSecurity.cors().and()
                .csrf().disable()
                .authorizeRequests(authorize -> authorize
                        // any request that doesn't match this pattern should be authenticated
                        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .antMatchers("/api/auth/**").permitAll()
                        .anyRequest()
                        .authenticated());
    }

    //
//        httpSecurity.httpBasic();
//
////        httpSecurity.cors().and()
////                .csrf().disable()
////                .authorizeHttpRequests(authorize -> authorize
////                        .antMatchers("/api/auth/**")
////                        .permitAll()
////                        .antMatchers(HttpMethod.GET, "/api/subreddit")
////                        .permitAll()
////                        .antMatchers(HttpMethod.GET, "/api/posts/")
////                        .permitAll()
////                        .antMatchers(HttpMethod.GET, "/api/posts/**")
////                        .permitAll()
////                        .antMatchers("/v2/api-docs",
////                                "/configuration/ui",
////                                "/swagger-resources/**",
////                                "/configuration/security",
////                                "/swagger-ui.html",
////                                "/webjars/**")
////                        .permitAll()
////                        .anyRequest()
////                        .authenticated())
////                .sessionManagement(session -> session.sessionCreationPolicy(
////                        SessionCreationPolicy.STATELESS));
//    }
//
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
