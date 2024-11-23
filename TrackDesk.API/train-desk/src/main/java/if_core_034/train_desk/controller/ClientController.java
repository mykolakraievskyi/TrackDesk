package if_core_034.train_desk.controller;

import if_core_034.train_desk.dto.CashDeskDto;
import if_core_034.train_desk.dto.ClientDto;
import if_core_034.train_desk.dto.StationConfigurationDto;
import if_core_034.train_desk.entity.Client;
import if_core_034.train_desk.entity.Entrance;
import if_core_034.train_desk.entity.Position;
import if_core_034.train_desk.entity.Station;
import if_core_034.train_desk.service.ClientService;
import if_core_034.train_desk.service.StationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.simp.SimpMessagingTemplate;


import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

@RestController
//@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final StationService stationService;

    @Autowired
    public ClientController(ClientService clientService, SimpMessagingTemplate simpMessagingTemplate,
                            StationService stationService) {
        this.clientService = clientService;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.stationService = stationService;
        ClientGeneration clientGeneration = new ClientGeneration();
        clientGeneration.run();
    }


//    @Scheduled(fixedRateString = "#{clientService.nextArrivalTime}", initialDelay = 5000)
    public void generateClient() {
        Client client = clientService.generateClient();
        ClientDto clientDto = new ClientDto(client.getId(), client.getStatus(), 1, client.getEntrance().getId());
        simpMessagingTemplate.convertAndSendToUser("standardUser", "/client/generate", clientDto);
        Station station = stationService.getStationInstance();
        station.setCurrClientNumber(station.getCurrClientNumber() + 1);

//        } else {
//            List<CashDeskDto> cashDeskDtos = new ArrayList<>();
//            List<Entrance> entrances = new ArrayList<>();
//            for(int i = 1; i <= 3; i++) {
//                cashDeskDtos.add(new CashDeskDto(i, new Position(i * 10, i * 10)));
//                entrances.add(new Entrance(i, new Position(i * 10, i * 10)));
//            }
//            StationConfigurationDto stationConfigurationDto = new StationConfigurationDto(cashDeskDtos, entrances, 15, 15);
//            stationService.createStationInstance(stationConfigurationDto);
//        }
    }

    private class ClientGeneration extends TimerTask {
        @Override
        public void run() {
            if(stationService.isInitialized().get()) {
                generateClient();
            }
            long delay = clientService.getNextArrivalTime();
            Timer timer = new Timer();
            timer.schedule(new ClientGeneration(), delay);
        }
    }
}
