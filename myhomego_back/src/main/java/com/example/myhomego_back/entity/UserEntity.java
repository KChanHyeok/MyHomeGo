package com.example.myhomego_back.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class UserEntity {

    @Id
    @Column(nullable = false, length = 20)
    private String userId;

    @Column(nullable = false, unique = true, length = 225)
    private String userEmail;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String userPwd;

    @Column(nullable = false, length = 5)
    private String userName;

    @Column(nullable = false, length = 13)
    private String phone;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime regDate;
}
