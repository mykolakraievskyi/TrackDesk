import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CashDeskService } from './cash-desk.service';

describe('CashDeskService', () => {
  let service: CashDeskService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://';  // Define the API URL used in the service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule to mock HttpClient
      providers: [CashDeskService],  // Provide the CashDeskService
    });

    service = TestBed.inject(CashDeskService);  // Inject CashDeskService
    httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController to mock requests
  });

  afterEach(() => {
    httpMock.verify();  // Ensure there are no outstanding HTTP requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Ensure the service is created successfully
  });

  describe('getCashDesks', () => {
    it('should fetch cash desks from the API', () => {
      const mockCashDesks = [{ id: 1, status: 'active' }, { id: 2, status: 'inactive' }];
      
      service.getCashDesks().subscribe((cashDesks) => {
        expect(cashDesks).toEqual(mockCashDesks);  // Check if the response matches the mock data
      });

      const req = httpMock.expectOne(`${apiUrl}`);  // Expect a GET request to the API URL
      expect(req.request.method).toBe('GET');  // Check that the request method is GET
      req.flush(mockCashDesks);  // Respond with the mock data
    });

    it('should handle error when API fails', () => {
      const errorMessage = 'Failed to fetch cash desks';

      service.getCashDesks().subscribe(
        () => fail('Expected an error, but got success'),
        (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      );

      const req = httpMock.expectOne(`${apiUrl}`);
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('updateCashDeskStatus', () => {
    it('should send a PUT request to update the cash desk status', () => {
      const cashDeskId = 1;
      const status = 'active';
      const mockResponse = { success: true };

      service.updateCashDeskStatus(cashDeskId, status).subscribe((response) => {
        expect(response).toEqual(mockResponse);  // Check if the response matches the mock response
      });

      const req = httpMock.expectOne(`${apiUrl}/status`);  // Expect a PUT request to the API URL with the status endpoint
      expect(req.request.method).toBe('PUT');  // Check that the request method is PUT
      expect(req.request.body).toEqual({ cashDeskId, status });  // Check the request body
      req.flush(mockResponse);  // Respond with the mock response
    });

    it('should handle error when update fails', () => {
      const cashDeskId = 1;
      const status = 'active';
      const errorMessage = 'Failed to update status';

      service.updateCashDeskStatus(cashDeskId, status).subscribe(
        () => fail('Expected an error, but got success'),
        (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/status`);
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
