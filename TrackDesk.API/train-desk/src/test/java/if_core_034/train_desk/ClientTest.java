package if_core_034.train_desk;

import if_core_034.train_desk.entity.Client;
import if_core_034.train_desk.entity.ClientStatus;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class ClientTest {

    @Test
    void testCompareTo_WhenStatusesAreEqual() {
        Client client1 = new Client(1, ClientStatus.regular, Collections.emptyList(), null, null);
        Client client2 = new Client(2, ClientStatus.regular, Collections.emptyList(), null, null);

        int result = client1.compareTo(client2);
        assertEquals(0, result, "Clients with the same status should return 0 from compareTo.");
    }

    @Test
    void testCompareTo_WhenStatusesAreDifferent() {
        Client client1 = new Client(1, ClientStatus.regular, Collections.emptyList(), null, null);
        Client client2 = new Client(2, ClientStatus.privileged, Collections.emptyList(), null, null);

        int result1 = client1.compareTo(client2);
        int result2 = client2.compareTo(client1);

        assertTrue(result1 < 0, "REGULAR status should precede WITH_CHILD status.");
        assertTrue(result2 > 0, "WITH_CHILD status should follow REGULAR status.");
    }

    @Test
    void testCompareTo_WhenOneStatusIsNull() {
        Client client1 = new Client(1, null, Collections.emptyList(), null, null);
        Client client2 = new Client(2, ClientStatus.regular, Collections.emptyList(), null, null);

        assertThrows(NullPointerException.class,
                () -> client1.compareTo(client2),
                "Comparing a null status should throw a NullPointerException.");
    }

    @Test
    void testCompareTo_WhenBothStatusesAreNull() {
        Client client1 = new Client(1, null, Collections.emptyList(), null, null);
        Client client2 = new Client(2, null, Collections.emptyList(), null, null);

        assertThrows(NullPointerException.class,
                () -> client1.compareTo(client2),
                "Comparing two null statuses should throw a NullPointerException.");
    }
}
