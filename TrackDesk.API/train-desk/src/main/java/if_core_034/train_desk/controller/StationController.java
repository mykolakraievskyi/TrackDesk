package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.StationConfigurationDto;
import if_core_034.train_desk.dto.F2B;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.RequiredArgsConstructor;

import java.util.Random;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StationController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    @Autowired(required = false)
    private StationConfigurationDto b2f;
    @Autowired(required = false)
    private F2B f2b;

    private static Integer[] generateRandomNumbers(int count, int min, int max) {
        Random random = new Random();
        Integer[] numbers = new Integer[count];

        // Генерація випадкових чисел у заданому діапазоні
        for (int i = 0; i < count; i++) {
            numbers[i] = random.nextInt((max - min) + 1) + min; // Генерація числа від min до max
        }

        return numbers;
    }

    @MessageMapping("/message")
    public void processMessage(@Payload String message) {
        System.out.println(message);
    }

    @Scheduled(fixedRate = 5000)
    public void sendOpenMsg() {
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(1), "/open/message", "Open station");
    }

    @PostMapping("/conf")
    public ResponseEntity<StationConfigurationDto> createCustomer(@RequestBody F2B conf) {
//        if (this.f2b != null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
        this.f2b = conf;
        System.out.println(conf);
        Integer[] cashRegisters = generateRandomNumbers(conf.getCashRegisters(), 2, 9);
        Integer[] entryPoints = generateRandomNumbers(conf.getEntry(), 1, 8);
        Integer[] exitPoints = generateRandomNumbers(conf.getExit(), 1, 8);

        StationConfigurationDto b2f = new StationConfigurationDto(cashRegisters, entryPoints, exitPoints);
        this.b2f = b2f;

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(b2f);
    }

    @GetMapping("/get/station")
    public ResponseEntity<String> getSomeInfo() {
        return ResponseEntity.ok("Some info");
    }
}
