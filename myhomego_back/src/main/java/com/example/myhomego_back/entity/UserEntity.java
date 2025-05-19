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
	private Long user_id;

	@Column(nullable =  false, unique = true)
	private String user_email;

	@Column(nullable =  false)
	private String user_pwd;

	@Column(nullable =  false)
	private String user_name;

	@Column(nullable =  false)
	private String phone;

	@Column
	@CreatedDate
	private LocalDateTime reg_date;
}
