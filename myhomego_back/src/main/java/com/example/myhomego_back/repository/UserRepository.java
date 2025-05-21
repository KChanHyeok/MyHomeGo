package com.example.myhomego_back.repository;

import com.example.myhomego_back.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    boolean existsByUserId(String userId);
    boolean existsByUserEmail(String userEmail);
    UserEntity findByUserId(String userId);
    UserEntity findByUserEmail(String userEmail);

}
