package if_core_034.train_desk.service;

import if_core_034.train_desk.strategy.ClientGenerationStrategy;
import if_core_034.train_desk.strategy.UniformGenerationStrategy;
import if_core_034.train_desk.strategy.RandomGenerationStrategy;
import if_core_034.train_desk.entity.CashDesk;
import if_core_034.train_desk.entity.Entrance;
import if_core_034.train_desk.entity.Position;
import if_core_034.train_desk.entity.TimeRange;
import if_core_034.train_desk.entity.Station;
import if_core_034.train_desk.dto.StationConfigurationDto;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.HashMap;
import java.util.List;
import java.time.LocalTime;
import java.util.Map;
import java.util.PriorityQueue;

@Service
public class StationService {

    private Station station;
    private final AtomicBoolean isInitialized;
    private ClientGenerationStrategy clientGenerationStrategy;
    private final ApplicationContext applicationContext;

    public StationService(ClientGenerationStrategy clientGenerationStrategy, ApplicationContext applicationContext) {
        this.clientGenerationStrategy = clientGenerationStrategy;
        this.isInitialized = new AtomicBoolean(false);
        this.applicationContext = applicationContext;
    }

    public void createStationInstance(StationConfigurationDto stationConfigurationDto) {
        List<Entrance> entrances = stationConfigurationDto.getEntrances();
        Map<Integer, CashDesk> cashDeskMap = new HashMap<>();
        for(var cashDeskDto : stationConfigurationDto.getCashDeskDtos()) {
            CashDesk cashDesk =
                    new CashDesk(cashDeskDto.getId(), cashDeskDto.getPosition(), new PriorityQueue<>(), false, true);
            cashDeskMap.put(cashDeskDto.getId(), cashDesk);
        }
        CashDesk reserveCashDesk = new CashDesk(0,  stationConfigurationDto.getReserveCashDeskDto().getPosition(),
                                                   new PriorityQueue<>(), true, false);
        TimeRange timeRange = new TimeRange(LocalTime.ofSecondOfDay(stationConfigurationDto.getSecondsStart()), LocalTime.ofSecondOfDay(stationConfigurationDto.getSecondsEnd()));
        int currClientNumber = 0;
        int maxClientCapacity = cashDeskMap.size() * 5;
        station = Station.getInstance(entrances, cashDeskMap, reserveCashDesk, timeRange, currClientNumber, maxClientCapacity);
        createGenerationStrategy(timeRange);
        this.isInitialized.set(true);
    }

    private void createGenerationStrategy(TimeRange timeRange) {
        if(timeRange.getMinTime().equals(timeRange.getMaxTime())) {
            this.clientGenerationStrategy = applicationContext.getBean(UniformGenerationStrategy.class);
        } else {
            this.clientGenerationStrategy = applicationContext.getBean(RandomGenerationStrategy.class);
        }
        this.clientGenerationStrategy.updateTimeRange(timeRange);
    }

    public Station getStationInstance() {
        return station;
    }

    public AtomicBoolean isInitialized() {
        return this.isInitialized;
    }

}
