import { Component, OnInit } from '@angular/core';
import { Bookingservice } from '../../services/bookingservice';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-my-bookings',
  imports: [],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {
  bookings: Booking[] = [];
  filter = 'All';
  loading = true;
  errorMessage = '';
  successMessage = '';

  constructor(private bookingService: Bookingservice) {}

  ngOnInit(): void {
    this.bookingService.getBookings('user1').subscribe({
      next:(data)=>{
        this.bookings = data;
        this.loading = false;
      },
      error:(err)=>{
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }
 cancelBooking(id: string){
    const ok = confirm(
      'Are you sure you want to cancel this booking?'
    );
    if(ok){

      this.bookingService.cancelBooking(id).subscribe({
        next:(updatedBooking)=>{
          this.successMessage =
          'Booking cancelled successfully';
          this.bookings =
          this.bookings.filter(
            b => b.id !== id
          );
        },
        error:(err)=>{
          this.errorMessage = err.message;
        }

      });

    }

  }

get filteredBookings(){

const today = new Date();

let result = this.bookings.filter(
  b => b.status !== 'Cancelled'
);


if(this.filter === 'Upcoming'){

  return result.filter(
    b => new Date(b.eventDate) >= today
  );

}


if(this.filter === 'Past'){

  return result.filter(
    b => new Date(b.eventDate) < today
  );

}


return result;

}
}
