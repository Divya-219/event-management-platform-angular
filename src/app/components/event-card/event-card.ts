import { Component, Input } from '@angular/core';
import { Event } from '../../models/event';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-event-card',
  imports: [RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  @Input() event!: Event;
   favorite = false;

  toggleFavorite(){

  this.favorite = !this.favorite;

  }
  
}
