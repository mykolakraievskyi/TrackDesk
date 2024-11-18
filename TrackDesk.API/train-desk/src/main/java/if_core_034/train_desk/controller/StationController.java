package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.B2F;
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

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StationController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    @Autowired(required = false)
    private F2B conf;


    @MessageMapping("/message")
    public void processMessage(@Payload String message) {
        System.out.println(message);
    }

    @Scheduled(fixedRate = 5000)
    public void sendOpenMsg() {
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(1), "/open/message", "Open station");
    }

        @PostMapping("/conf")
    public ResponseEntity<B2F> createCustomer(@RequestBody F2B conf) {
//        if (this.conf != null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
        this.conf = conf;
        System.out.println(conf);
        Integer[] cashRegisters = {2, 3, 4};
        Integer[] entryPoints = {4, 5};
        Integer[] exitPoints = {6, 7, 8};

        B2F b2f = new B2F(cashRegisters, entryPoints, exitPoints);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(b2f);
    }

    @GetMapping("/get/station")
    public ResponseEntity<String> getSomeInfo() {
        return ResponseEntity.ok("Some info");
    }
}
