package if_core_034.train_desk;

import if_core_034.train_desk.entity.CashDesk;
import if_core_034.train_desk.entity.Entrance;
import if_core_034.train_desk.entity.Station;
import if_core_034.train_desk.entity.TimeRange;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

import java.time.LocalTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class StationTest {
    Entrance entranceMock = mock(Entrance.class);
    CashDesk cashDeskMock = mock(CashDesk.class);
    TimeRange timeRangeMock = mock(TimeRange.class);

    @Test
    void testInitializationParameters() {
        Map<Integer, CashDesk> cashDeskMap = Map.of(1, cashDeskMock, 2, cashDeskMock);

        Station station = Station.getInstance(
                List.of(entranceMock),
                cashDeskMap,
                cashDeskMock,
                timeRangeMock,
                5,
                200
        );

        assertEquals(1, station.getEntrances().size(), "Entrances size should be 1");
        assertEquals(2, station.getCashDeskMap().size(), "CashDeskMap size should be 2");
        assertSame(cashDeskMock, station.getCashDeskMap().get(1), "CashDesk with key 1 should match");
        assertSame(cashDeskMock, station.getCashDeskMap().get(2), "CashDesk with key 2 should match");
        assertNotNull(station.getReserveCashDesk(), "ReserveCashDesk should not be null");
        assertEquals(timeRangeMock, station.getServiceTimeRange(), "ServiceTimeRange should match");
        assertEquals(5, station.getCurrClientNumber(), "Current client number should match");
        assertEquals(200, station.getMaxClientCapacity(), "Max client capacity should match");
    }



    @Test
    void testSingletonProperty() {
        Station station1 = Station.getInstance(
                Collections.emptyList(),
                new HashMap<>(),
                null,
                new TimeRange(LocalTime.of(10, 30), LocalTime.of(11, 30)),
                0,
                100
        );
        Station station2 = Station.getInstance(
                Collections.emptyList(),
                new HashMap<>(),
                null,
                new TimeRange(LocalTime.of(10, 30), LocalTime.of(11, 30)),
                0,
                100
        );

        assertSame(station1, station2, "Singleton instances should be the same");
    }
}
