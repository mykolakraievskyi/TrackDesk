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
import java.util.Map;

@Service
@RequiredArgsConstructor
@Getter
public class ClientService {
    private final ClientFactory clientFactory;
    private final StationService stationService;


    public Client generateClient() {
        return this.clientFactory.generateClient();
    }

    public Long getNextArrivalTime() {
        return clientFactory.getClientGenerationStrategy().getNextArrivalTime() != null ?
                this.clientFactory.getClientGenerationStrategy().getNextArrivalTime().toSecondOfDay() * 1000L :
                5000L;
    }

    public int getBestCashRegisterId(Client client) {
        Map<Integer, CashDesk> cashDesks = stationService.getStationInstance().getCashDeskMap();
        Comparator<CashDesk> cc = Comparator.comparing((CashDesk cashDesk) -> cashDesk.getPotentialQueuePosition(client))
                .thenComparingDouble(cashDesk -> calculateDistance(client.getPosition(), cashDesk.getPosition()));
        CashDesk bestCashDesk = cashDesks.values().stream()
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
