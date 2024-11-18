package if_core_034.train_desk.service;

import if_core_034.train_desk.entity.CashDesk;
import if_core_034.train_desk.entity.Client;
import if_core_034.train_desk.entity.Station;
import if_core_034.train_desk.entity.Entrance;


import if_core_034.train_desk.entity.ClientStatus;
import if_core_034.train_desk.entity.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final TicketGenerator ticketGenerator;
    private Station station;

    public ClientService(@Autowired TicketGenerator ticketGenerator, Station station) {
       this.ticketGenerator = ticketGenerator;
       this.station = Station.getInstance(null, null, null, null, 0, 0);
    }

    public Client generateClient() {
        Random random = new Random();
        ClientStatus[] clientStatusesArr = ClientStatus.values();
        Entrance entrance = station.getEntrances().get(random.nextInt(station.getEntrances().size()));
        return new Client(random.nextInt(), clientStatusesArr[random.nextInt(clientStatusesArr.length)], generateTickets(), entrance, entrance.getPosition());
    }

//    private CashDesk chooseCashDesk(Entrance entrance, ClientStatus clientStatus, List<CashDesk> cashDesks) {
//
//    }

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
