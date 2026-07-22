import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Eventservice } from '../../services/eventservice';
import { ActivatedRoute } from '@angular/router';
import { Event, TicketType } from '../../models/event';
import { Bookingservice } from '../../services/bookingservice';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-booking',
  imports: [RouterLink, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
   event!: Event;
   selectedTicket!: TicketType;
    quantity = 1;
    fullName = '';
    phone = '';
    email = '';
    total = 0;
    step = 1;
    bookingReference = '';
    constructor(private route: ActivatedRoute, private eventService: Eventservice, private bookingService: Bookingservice) {
    const id = this.route.snapshot.paramMap.get('id');  
    if (id) {
  this.eventService.getEventById(id).subscribe({
    next: (event) => {
      this.event = event;
      this.selectedTicket = event.ticketTypes[0];
      this.calculateTotal();
    }
  });
}
}
  calculateTotal() {
    this.total =this.selectedTicket.price * this.quantity;
  }
  updateTicket(ticketId: string) {
  const ticket = this.event.ticketTypes.find(t => t.id === ticketId);
  if (ticket) {
    this.selectedTicket = ticket;
    this.calculateTotal();
  }

}
updateQuantity(value: string) {

  this.quantity = Number(value);
  this.calculateTotal();
}
confirmBooking() {

  const booking = {

    id: Date.now().toString(),
    userId: 'user1',
    eventId: this.event.id,
    eventTitle: this.event.title,
    eventDate: this.event.date,

    tickets: [
      {
        type: this.selectedTicket.name,
        quantity: this.quantity,
        price: this.selectedTicket.price
      }

    ],
    attendees: [
      {
        name: this.fullName,
        email: this.email,
        phone: this.phone
      }
    ],
    totalAmount: this.total,
    status: 'Confirmed',
    bookingDate: new Date().toLocaleDateString(),
    referenceNumber:'BK' + Math.floor(Math.random() * 10000)
  };
  this.bookingReference = booking.referenceNumber;
  this.bookingService.addBooking(booking).subscribe({
  next: () => {
    this.step = 4;
  },

  error: (err) => {
  console.error(err);
  }

});

}
nextStep() {
  this.step++;
}

previousStep() {
  this.step--;
}

}
