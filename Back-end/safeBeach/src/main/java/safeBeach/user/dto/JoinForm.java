package safeBeach.user.dto;

import java.time.LocalDate;

public class JoinForm {
    private String userId;
    private String password;
    private String name;
    private String phone;
    private LocalDate birth;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getBirth() { return birth; }
    public void setBirth(LocalDate birth) { this.birth = birth; }
}
