import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Bookingservice {
  private http = inject(HttpClient);
  getBookings(userId: string): Observable<Booking[]> {
   return this.http.get<Booking[]>(`http://localhost:3000/bookings?userId=${userId}`).pipe
   (
      delay(2000)
    );

  }
  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>('http://localhost:3000/bookings',
      booking
    );

  }
  cancelBooking(id: string): Observable<Booking> {
    return this.http.patch<Booking>(`http://localhost:3000/bookings/${id}`,
      {
        status: 'Cancelled'
      }
    );

  }

}