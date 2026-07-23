import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Bookingservice {
  private http = inject(HttpClient);
  private api ='https://6a6127a1da10c59c18096d82.mockapi.io/event-management/bookings';
  getBookings(userId: string): Observable<Booking[]> {
   return this.http.get<Booking[]>(`${this.api}?userId=${userId}`).pipe
   (
      delay(2000)
    );

  }
  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking> (this.api,
      booking
    );

  }
  cancelBooking(id: string): Observable<Booking> {
    return this.http.put<Booking>( `${this.api}/${id}`,
      {
        status: 'Cancelled'
      }
    );

  }

}