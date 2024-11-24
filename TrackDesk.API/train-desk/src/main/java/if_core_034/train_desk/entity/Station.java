package if_core_034.train_desk.entity;

import lombok.Data;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.List;
import java.util.Map;

@Data
public class Station {
    private static volatile Station instance;
    private List<Entrance> entrances;
    private Map<Integer, CashDesk> cashDeskMap;
    private CashDesk reserveCashDesk;
    private TimeRange serviceTimeRange;
    private AtomicInteger currClientNumber;
    private int maxClientCapacity;
    private volatile boolean isClosed;

    private Station(List<Entrance> entrances,
                    Map<Integer, CashDesk> cashDesks,
                    CashDesk reserveCashDesk,
                    TimeRange serviceTimeRange,
                    int currClientNumber,
                    int maxClientCapacity) {
        this.entrances = entrances;
        this.cashDeskMap = cashDesks;
        this.reserveCashDesk = reserveCashDesk;
        this.serviceTimeRange = serviceTimeRange;
        this.currClientNumber = new AtomicInteger(currClientNumber);
        this.maxClientCapacity = maxClientCapacity;
        this.isClosed = false;
    }

    public static Station getInstance(List<Entrance> entrances,
                               Map<Integer, CashDesk> cashDeskMap,
                               CashDesk reserveCashDesk,
                               TimeRange timeRange,
                               int currClientNumber,
                               int maxClientCapacity) {
        if(instance == null) {
            synchronized(Station.class) {
                if(instance == null) {
                    instance = new Station(entrances, cashDeskMap, reserveCashDesk, timeRange,
                                           currClientNumber, maxClientCapacity);
                }

            }
        }
        return instance;
    }
}
