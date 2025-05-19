package com.example.myhomego_back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;


@Entity
@Data
@Table(name = "user")
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@Column(nullable =  false, unique = true)
	private String userEmail;

	@Column(nullable =  false)
	private String userPwd;

	@Column(nullable =  false)
	private String userName;

	@Column(nullable =  false)
	private String phone;

	@Column
	@CreatedDate
	private LocalDateTime regDate;
}
