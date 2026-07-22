import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';



@Injectable({
  providedIn: 'root'
})
export class Eventservice {

  http = inject(HttpClient);


  getEvents(): Observable<Event[]> {

    return this.http.get<Event[]>( 'http://localhost:3000/events');
  }
  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`http://localhost:3000/events/${id}`);
  }

}