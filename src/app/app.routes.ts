import { Routes } from '@angular/router';
import { Events } from './pages/events/events';
import {Eventdetails} from './pages/eventdetails/eventdetails';
import{Booking} from './pages/booking/booking';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { Profile } from './pages/profile/profile';
import { NotFound } from './pages/not-found/not-found';


export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: Events },
  { path: 'events/:id', component: Eventdetails },
  { path: 'booking/:id', component: Booking },
  { path: 'my-bookings', component: MyBookings },
  { path: 'profile', component: Profile },
  { path:'**', component: NotFound }
];
