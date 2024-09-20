import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private totalSeats = 80; // Total seats in the coach
  private seats: any[] = []; // Array to store the status of each seat (booked or available)
  private rows = 12; // Total rows (11 rows with 7 seats, 1 row with 3 seats)

  constructor() {
    this.initializeSeats(); // Initialize the seat layout
  }

  // Initializes the seat layout with booked and available seats
  private initializeSeats() {
    let seatNumber = 1;
    for (let i = 0; i < this.rows; i++) {
      let rowSeats = [];
      let seatCount = i === 11 ? 3 : 7; // Last row has only 3 seats

      for (let j = 0; j < seatCount; j++) {
        rowSeats.push({
          number: seatNumber,
          isBooked: false, // All seats are initially available (not booked)
        });
        seatNumber++;
      }
      this.seats.push(rowSeats);
    }

    // Example: Manually mark some seats as booked
    this.seats[0][0].isBooked = true; // Seat 1 booked
    this.seats[1][4].isBooked = true; // Seat 12 booked
  }

  // Returns the seat layout to display in the component
  getSeatLayout() {
    return this.seats;
  }

  // Books the requested number of seats and returns the list of booked seat numbers
  bookSeats(seatCount: number): number[] {
    let bookedSeats: number[] = [];
    let found = false;

    // Try to book seats in the same row
    for (let row of this.seats) {
      let availableSeatsInRow = row.filter((seat: any) => !seat.isBooked);
      if (availableSeatsInRow.length >= seatCount) {
        for (let i = 0; i < seatCount; i++) {
          availableSeatsInRow[i].isBooked = true;
          bookedSeats.push(availableSeatsInRow[i].number);
        }
        found = true;
        break;
      }
    }

    // If not enough seats are found in a single row, book nearby seats
    if (!found) {
      for (let row of this.seats) {
        for (let seat of row) {
          if (!seat.isBooked && bookedSeats.length < seatCount) {
            seat.isBooked = true;
            bookedSeats.push(seat.number);
          }
        }
      }
    }

    return bookedSeats.length === seatCount ? bookedSeats : [];
  }
}