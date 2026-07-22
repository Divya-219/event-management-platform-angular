import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-hero',
  imports: [FormsModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
   search = '';
  @Output() searchEvent = new EventEmitter<string>();
  searchEvents(){

    this.searchEvent.emit(this.search);

  }
}
