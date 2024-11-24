import { TestBed } from '@angular/core/testing';
import { StompService } from './websocket.service';
import { Client, Message, IFrame } from '@stomp/stompjs'; 
import SockJS from 'sockjs-client';
import { of } from 'rxjs';

describe('StompService', () => {
  let service: StompService;
  let mockClient: jasmine.SpyObj<Client>;
  let mockSubscription: jasmine.SpyObj<any>;

  beforeEach(() => {
    mockClient = jasmine.createSpyObj('Client', ['activate', 'deactivate', 'subscribe', 'publish']);
    Object.defineProperty(mockClient, 'connected', {
      get: () => true, 
      set: () => {},
    });

    mockSubscription = jasmine.createSpyObj('StompSubscription', ['unsubscribe']);

    TestBed.configureTestingModule({
      providers: [
        StompService,
        { provide: Client, useValue: mockClient },
      ],
    });

    service = TestBed.inject(StompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('connect', () => {
    it('should log error on STOMP error', () => {
      spyOn(console, 'error');
      const frame: IFrame = {
        command: 'ERROR',
        headers: { 'message': 'Error' },
        body: 'Details',
        isBinaryBody: false,
        binaryBody: new Uint8Array(),  
      };
  
      service.connect('ws://localhost');
      mockClient.onStompError!(frame);
  
      expect(console.error).toHaveBeenCalledWith('STOMP Error:', 'Error');
      expect(console.error).toHaveBeenCalledWith('Details:', 'Details');
    });
  });  

  describe('listen', () => {
    it('should subscribe to a topic and emit data', (done) => {
      const topic = '/topic/test';
      const message = { body: '{"key": "value"}' };
      spyOn(mockClient, 'subscribe').and.returnValue(mockSubscription);

      const observable = service.listen(topic);

      observable.subscribe((data) => {
        expect(data).toEqual({ key: 'value' });
        done();
      });

      mockClient.subscribe.calls.mostRecent().args[1](message as Message);
    });

    it('should warn if already subscribed to a topic', () => {
      const topic = '/topic/test';
      spyOn(console, 'warn');

      service['subscriptions'].set(topic, mockSubscription); 

      service.listen(topic);

      expect(console.warn).toHaveBeenCalledWith(`Not subscribed to topic: ${topic}`);
    });
  });

  describe('emit', () => {
    it('should publish a message if client is connected', () => {
      const destination = '/topic/test';
      const body = { data: 'test' };

      service.emit(destination, body);

      expect(mockClient.publish).toHaveBeenCalledWith({
        destination: destination,
        body: JSON.stringify(body),
      });
    });

    it('should log error if client is not connected', () => {
      spyOn(console, 'error');
      
      Object.defineProperty(mockClient, 'connected', {
        get: () => false,
      });
  
      service.emit('/topic/test', { data: 'test' });
  
      expect(console.error).toHaveBeenCalledWith('STOMP Client is not connected.');
    });
  });

  describe('unsubscribe', () => {
    it('should unsubscribe from a topic', () => {
      const topic = '/topic/test';
      service['subscriptions'].set(topic, mockSubscription);

      service.unsubscribe(topic);

      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
      expect(service['subscriptions'].has(topic)).toBeFalse();
    });

    it('should log a warning if no subscription exists for the topic', () => {
      spyOn(console, 'warn');
      service.unsubscribe('/topic/test');

      expect(console.warn).toHaveBeenCalledWith('No subscription found for topic: /topic/test');
    });
  });

  describe('disconnect', () => {
    it('should deactivate the client and clear subscriptions', () => {
      service.disconnect();

      expect(mockClient.deactivate).toHaveBeenCalled();
      expect(service['subscriptions'].size).toBe(0);
    });
  });
});
