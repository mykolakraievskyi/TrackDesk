package if_core_034.train_desk;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableScheduling
public class TrainDeskApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrainDeskApplication.class, args);
	}

}
