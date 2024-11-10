package if_core_034.train_desk.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Station {
    private Station instance;
    private List<Entrance> entrances;
    private List<CashDesk> cashDesks;
    private CashDesk reserveCashDesk;
    private TimeRange serviceTimeRange;
    private int currClientNumber;
    private int maxClientCapacity;
}
