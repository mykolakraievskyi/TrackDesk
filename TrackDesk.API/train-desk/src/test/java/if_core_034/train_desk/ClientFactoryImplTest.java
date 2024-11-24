package if_core_034.train_desk;

import if_core_034.train_desk.entity.*;
import if_core_034.train_desk.service.StationService;
import if_core_034.train_desk.service.TicketGenerator;
import if_core_034.train_desk.strategy.ClientGenerationStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ClientFactoryImplTest {

    private StationService stationServiceMock;
    private TicketGenerator ticketGeneratorMock;
    private ClientGenerationStrategy generationStrategyMock;
    private ClientFactoryImpl clientFactory;

    @BeforeEach
    void setUp() {
        stationServiceMock = mock(StationService.class);
        ticketGeneratorMock = mock(TicketGenerator.class);
        generationStrategyMock = mock(ClientGenerationStrategy.class);


        clientFactory = new ClientFactoryImpl(generationStrategyMock, ticketGeneratorMock, stationServiceMock);
    }

    @Test
    void testGenerateClient_ValidClientCreated() {
        // Mock entrance and station
        Entrance entranceMock = mock(Entrance.class);
        Position positionMock = mock(Position.class);
        when(entranceMock.getPosition()).thenReturn(positionMock);

        Station stationMock = mock(Station.class);
        when(stationMock.getEntrances()).thenReturn(Collections.singletonList(entranceMock));
        when(stationServiceMock.getStationInstance()).thenReturn(stationMock);

        // Mock ticket generation
        Ticket ticketMock = mock(Ticket.class);
        when(ticketGeneratorMock.generateTicket()).thenReturn(ticketMock);

        // Generate client
        Client client = clientFactory.generateClient();

        // Validate client fields
        assertNotNull(client, "Generated client should not be null.");
        assertNotNull(client.getStatus(), "Client status should not be null.");
        assertTrue(client.getStatus() instanceof ClientStatus, "Client status should be a valid enum value.");
        assertNotNull(client.getEntrance(), "Client entrance should not be null.");
        assertEquals(entranceMock, client.getEntrance(), "Client entrance should match the mocked entrance.");
        assertNotNull(client.getPosition(), "Client position should not be null.");
        assertEquals(positionMock, client.getPosition(), "Client position should match the mocked position.");
        assertNotNull(client.getTickets(), "Client tickets should not be null.");
        assertFalse(client.getTickets().isEmpty(), "Client should have at least one ticket.");

        // Verify ticket generation
        verify(ticketGeneratorMock, atLeastOnce()).generateTicket();
        verify(stationServiceMock, times(1)).getStationInstance();
    }
}
