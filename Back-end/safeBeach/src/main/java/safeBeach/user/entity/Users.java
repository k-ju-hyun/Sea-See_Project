package safeBeach.user.entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

//사용자 정보를 정의

@Entity
@Table(name = "users")
public class Users {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String userId;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private LocalDate birth;


    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}


    public String getUserId() {return userId;}
    public void setUserId(String userId) {this.userId = userId;}


    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }


    public String getName() {return name;}
    public void setName(String name) {this.name = name;}


    public String getPhone() {return phone;}
    public void setPhone(String phone) {this.phone = phone;}


    public LocalDate getBirth() {return birth;}
    public void setBirth(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate birth) {this.birth = birth;}
}
