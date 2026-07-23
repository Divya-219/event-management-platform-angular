import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';



@Injectable({
  providedIn: 'root'
})
export class Eventservice {

  http = inject(HttpClient);
  private api='https://6a6127a1da10c59c18096d82.mockapi.io/event-management/events';


  getEvents(): Observable<Event[]> {

    return this.http.get<Event[]>(this.api);
  }
  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.api}/${id}`);
  }

}