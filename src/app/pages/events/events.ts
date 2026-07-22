import { Component, OnInit } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { EventCard } from '../../components/event-card/event-card';
import { Event } from '../../models/event';
import { Eventservice } from '../../services/eventservice';
import { FormsModule } from '@angular/forms';
import { FilterEventPipe } from '../../pipes/filter-event.pipe';

@Component({
  selector: 'app-events',
  imports: [Hero,EventCard,FormsModule,FilterEventPipe],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {

  events: Event[] = [];
  loading = true;
  errorMessage = '';
  search = '';
  category = '';
  price = '';
  sort = '';
  dateFilter = '';

  constructor(private eventService: Eventservice) {}

  ngOnInit(): void {
  this.loading = true;
  this.eventService.getEvents().subscribe({
    next: (data) => {
      this.events = data;
      this.loading = false;
    },
    error: (err) => {
      this.errorMessage = err.message;
      this.loading = false;
    }
  });
}
}