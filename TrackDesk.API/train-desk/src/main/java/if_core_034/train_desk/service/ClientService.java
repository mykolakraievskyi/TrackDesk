package if_core_034.train_desk.service;

import if_core_034.train_desk.entity.*;


import if_core_034.train_desk.strategy.RandomGenerationStrategy;
import if_core_034.train_desk.strategy.UniformGenerationStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Getter
public class ClientService {
<<<<<<< HEAD
    private final ClientFactory clientFactory;
=======
    private ClientFactory clientFactory;

    public ClientService(@Autowired TicketGenerator ticketGenerator) {
        this.clientFactory = new ClientFactoryImpl(new UniformGenerationStrategy(LocalTime.ofSecondOfDay(5L)),
                ticketGenerator);

    }

>>>>>>> 68d6b764b00ce37a79c0a9d4f4a6ea7142ff4e13

    public Client generateClient() {
//        this.clientFactory = new ClientFactoryImpl(new UniformGenerationStrategy(), new TicketGenerator());
        return this.clientFactory.generateClient();
    }

    public Long getNextArrivalTime() {
        return clientFactory.getClientGenerationStrategy().getNextArrivalTime() != null ?
                this.clientFactory.getClientGenerationStrategy().getNextArrivalTime().toSecondOfDay() * 1000L :
                5000L;
    }


    public int getBestCashRegisterId(Client client) {
        // -- temp code
        StationService stationService = new StationService();
        Station station = stationService.getStationInstance();
        //
        List<CashDesk> cashDesks = station.getCashDesks();
        Comparator<CashDesk> cc = Comparator.comparing((CashDesk cashDesk) -> cashDesk.getPotentialQueuePosition(client))
                .thenComparingDouble(cashDesk -> calculateDistance(client.getPosition(), cashDesk.getPosition()));
        CashDesk bestCashDesk = cashDesks.stream()
                .min(cc)
                .orElseThrow();
        return bestCashDesk.getId();
    }

    private double calculateDistance(Position p1, Position p2) {
        double deltaX = p1.getX() - p2.getX();
        double deltaY = p1.getY() - p2.getY();
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
}
