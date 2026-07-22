import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Eventservice } from '../../services/eventservice';
import { Event } from '../../models/event';

@Component({
  selector: 'app-eventdetails',
  imports: [RouterLink],
  templateUrl: './eventdetails.html',
  styleUrl: './eventdetails.css',
})
export class Eventdetails implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(Eventservice);
  event?: Event;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Route id:', id);
      if (id) {
        this.eventService.getEventById(id).subscribe({
          next: (event) => {
            console.log('Event:', event);
            this.event = event;
          },
          error: (err) => console.error(err)
        });
      }
    });
  }
}