package if_core_034.train_desk.entity;

import if_core_034.train_desk.service.StationService;
import if_core_034.train_desk.service.TicketGenerator;
import if_core_034.train_desk.strategy.ClientGenerationStrategy;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ClientFactoryImpl implements ClientFactory {
    @Getter
    private final ClientGenerationStrategy clientGenerationStrategy;
    private final StationService stationService;
    private final TicketGenerator ticketGenerator;

    public ClientFactoryImpl(ClientGenerationStrategy clientGenerationStrategy, @Autowired StationService stationService, @Autowired TicketGenerator ticketGenerator) {
        this.clientGenerationStrategy = clientGenerationStrategy;
        this.stationService = stationService;
        this.ticketGenerator = ticketGenerator;
    }



    public Client generateClient() {
        Random random = new Random();
        ClientStatus[] clientStatusesArr = ClientStatus.values();
        Station station = stationService.getStationInstance();
        Entrance entrance = station.getEntrances().get(random.nextInt(station.getEntrances().size()));
        return new Client(random.nextInt(), clientStatusesArr[random.nextInt(clientStatusesArr.length)],
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
