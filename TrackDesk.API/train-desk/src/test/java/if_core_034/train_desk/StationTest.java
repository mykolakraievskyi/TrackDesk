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
import java.util.List;

class StationTest {
    Entrance entranceMock = mock(Entrance.class);
    CashDesk cashDeskMock = mock(CashDesk.class);
    TimeRange timeRangeMock = mock(TimeRange.class);

    @Test
    void testInitializationParameters() {;
        Station station = Station.getInstance(
                List.of(entranceMock),
                List.of(cashDeskMock),
                cashDeskMock,
                timeRangeMock,
                5,
                200
        );

        assertEquals(1, station.getEntrances().size(), "Entrances size should be 1");
        assertEquals(1, station.getCashDesks().size(), "CashDesks size should be 1");
        assertNotNull(station.getReserveCashDesk(), "ReserveCashDesk should not be null");
        assertEquals(timeRangeMock, station.getServiceTimeRange(), "ServiceTimeRange should match");
        assertEquals(5, station.getCurrClientNumber(), "Current client number should match");
        assertEquals(200, station.getMaxClientCapacity(), "Max client capacity should match");
    }


    @Test
    void testSingletonProperty() {
        Station station1 = Station.getInstance(
                Collections.emptyList(),
                Collections.emptyList(),
                null,
                new TimeRange(LocalTime.of(10, 30), LocalTime.of(11, 30)),
                0,
                100
        );
        Station station2 = Station.getInstance(
                Collections.emptyList(),
                Collections.emptyList(),
                null,
                new TimeRange(LocalTime.of(10, 30), LocalTime.of(11, 30)),
                0,
                100
        );

        assertSame(station1, station2, "Singleton instances should be the same");
    }
}
