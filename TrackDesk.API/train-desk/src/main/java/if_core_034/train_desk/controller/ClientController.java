package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.ClientDto;
import if_core_034.train_desk.entity.Client;
import if_core_034.train_desk.service.ClientService;

import if_core_034.train_desk.service.StationService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.messaging.simp.SimpMessagingTemplate;


import lombok.RequiredArgsConstructor;

import java.time.LocalTime;

@RestController
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Scheduled(fixedRateString = "#{@clientService.nextArrivalTime}")
    public void generateClient() {
        Client client = clientService.generateClient();
        ClientDto clientDto = new ClientDto(client.getId(), client.getStatus(), client.getEntrance().getId());
        simpMessagingTemplate.convertAndSendToUser("standardUser", "/client/generate", clientDto);
    }
}
