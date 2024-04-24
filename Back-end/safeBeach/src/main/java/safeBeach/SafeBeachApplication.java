package safeBeach;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RestController;
@EnableScheduling
@RestController
@SpringBootApplication
public class SafeBeachApplication {

	public static void main(String[] args) {
		SpringApplication.run(SafeBeachApplication.class, args);
	}
}
