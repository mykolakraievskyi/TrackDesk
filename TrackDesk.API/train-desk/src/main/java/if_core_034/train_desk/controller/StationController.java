package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.StationConfigurationDto;
import if_core_034.train_desk.service.StationService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.RequiredArgsConstructor;

<<<<<<< HEAD
=======
import java.util.HashSet;
import java.util.Random;

>>>>>>> 4d3c18be1d5fe37e02717aabe958fa4cce2d647c
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StationController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final StationService stationService;

<<<<<<< HEAD
//    private static Integer[] generateRandomNumbers(int count, int min, int max) {
//        Random random = new Random();
//        Integer[] numbers = new Integer[count];
//
//        // Генерація випадкових чисел у заданому діапазоні
//        for (int i = 0; i < count; i++) {
//            numbers[i] = random.nextInt((max - min) + 1) + min; // Генерація числа від min до max
//        }
//
//        return numbers;
//    }

    @PostMapping("/api/v1/configuration")
    public void setStationConfiguration(@RequestBody StationConfigurationDto stationConfigurationDto) {
        stationService.createStationInstance(stationConfigurationDto);
=======
    private static Integer[] generateUniqueRandomNumbers(int count, int min, int max) {
        Random random = new Random();
        HashSet<Integer> uniqueNumbers = new HashSet<>();

        if (max - min + 1 < count) {
            count = max - min + 1;
        }

        Integer[] numbers = new Integer[count];

        while (uniqueNumbers.size() < count) {
            int newInt = random.nextInt(min, max + 1);
            uniqueNumbers.add(newInt); // Ensures uniqueness
        }

        return uniqueNumbers.toArray(numbers);
>>>>>>> 4d3c18be1d5fe37e02717aabe958fa4cce2d647c
    }

//    @MessageMapping("/message")
//    public void processMessage(@Payload String message) {
//        System.out.println(message);
//    }

    @Scheduled(fixedRate = 5000)
    public void sendCloseMessage() {
        simpMessagingTemplate.convertAndSendToUser("standardUser", "/station/close/message", true);
    }

<<<<<<< HEAD
=======
    @PostMapping("/conf")
    public ResponseEntity<StationConfigurationDto> createCustomer(@RequestBody F2B conf) {
//        if (this.f2b != null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
        this.f2b = conf;
        System.out.println(conf);
        Integer[] cashRegisters = generateUniqueRandomNumbers(conf.getCashRegisters(), 1, 9);
        Integer[] entryPoints = generateUniqueRandomNumbers(conf.getEntry(), 1, 8);
        Integer[] exitPoints = generateUniqueRandomNumbers(conf.getExit(), 1, 8);
>>>>>>> 4d3c18be1d5fe37e02717aabe958fa4cce2d647c


//    @PostMapping("/conf")
//    public ResponseEntity<StationConfigurationDto> createCustomer(@RequestBody F2B conf) {
////        if (this.f2b != null) {
////            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
////        }
//
//        System.out.println(conf);
//        Integer[] cashRegisters = generateRandomNumbers(conf.getCashRegisters(), 2, 9);
//        Integer[] entryPoints = generateRandomNumbers(conf.getEntry(), 1, 8);
//        Integer[] exitPoints = generateRandomNumbers(conf.getExit(), 1, 8);
//
//    }


}
