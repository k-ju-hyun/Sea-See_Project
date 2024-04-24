package safeBeach;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")// 모든 경로에 대해 CORS 설정 적용
                .allowedOrigins("http://localhost:3000") // 허용할 오리진
                .allowCredentials(true) //세션등 인증 정보 전송 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
