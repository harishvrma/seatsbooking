import { Component } from '@angular/core';
import { SeatService } from './seat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seatCount: number = 0; // Number of seats to be booked
  rows: any[] = []; // The layout of seats (rows with seats)
  bookedSeats: number[] = []; // List of booked seats for the current request
  errorMessage: string = ''; // Error message for any issue during booking

  constructor(private seatService: SeatService) {
    this.rows = this.seatService.getSeatLayout(); // Get the seat layout from the service
  }

  // Method to handle seat booking when the user clicks the "Book Seats" button
  bookSeats() {
    if (this.seatCount < 1) {
      this.errorMessage = 'Please enter a valid number of seats.';
      return;
    }
  
    // Attempt to book the requested number of seats
    this.bookedSeats = this.seatService.bookSeats(this.seatCount); 
  
    if (this.bookedSeats.length > 0) {
      this.errorMessage = ''; // Clear error message if booking is successful
    } else {
      this.errorMessage = 'Not enough seats available to fulfill your request.';
    }
  }
  
}