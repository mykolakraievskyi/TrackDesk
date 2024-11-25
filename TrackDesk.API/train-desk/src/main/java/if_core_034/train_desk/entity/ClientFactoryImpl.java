package if_core_034.train_desk.entity;

import if_core_034.train_desk.service.StationService;
import if_core_034.train_desk.service.TicketGenerator;
import if_core_034.train_desk.strategy.ClientGenerationStrategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class ClientFactoryImpl implements ClientFactory {
    @Getter
    private final ClientGenerationStrategy clientGenerationStrategy;
    private final TicketGenerator ticketGenerator;
    private final StationService stationService;
    private int clientCounter;

    @Autowired
    public ClientFactoryImpl(ClientGenerationStrategy clientGenerationStrategy, TicketGenerator ticketGenerator, StationService stationService) {
        this.clientGenerationStrategy = clientGenerationStrategy;
        this.ticketGenerator = ticketGenerator;
        this.stationService = stationService;
        this.clientCounter = 0;
    }


    public Client generateClient() {
        Random random = new Random();
        ClientStatus[] clientStatusesArr = ClientStatus.values();
        Entrance entrance = stationService.getStationInstance().getEntrances()
                                                               .get(random.nextInt(stationService.getStationInstance()
                                                                                                 .getEntrances().size()));
        this.clientCounter++;
        return new Client(this.clientCounter, clientStatusesArr[random.nextInt(clientStatusesArr.length)],
                          generateTickets(), entrance, entrance.getPosition());
    }

    private List<Ticket> generateTickets() {
        List<Ticket> tickets = new ArrayList<>();
        int ticketNumber = (int) (1 + Math.random() * 10);
        if(ticketNumber > 5) {
            ticketNumber = 1;
        }
        for(int i = 0; i < ticketNumber; i++) {
            tickets.add(ticketGenerator.generateTicket());
        }
        return tickets;
    }


}
