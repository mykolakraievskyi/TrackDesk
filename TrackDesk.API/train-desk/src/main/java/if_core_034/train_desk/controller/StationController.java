package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.StationConfigurationDto;
import if_core_034.train_desk.service.StationService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StationController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final StationService stationService;

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
    }

//    @MessageMapping("/message")
//    public void processMessage(@Payload String message) {
//        System.out.println(message);
//    }

    @Scheduled(fixedRate = 5000)
    public void sendCloseMessage() {
        simpMessagingTemplate.convertAndSendToUser("standardUser", "/station/close/message", true);
    }



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
