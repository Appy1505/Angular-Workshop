import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IBook } from '../ibook';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {
  @Input() rating: number = 0; 
  @Input() book: IBook ={
    id:0,
    title:'',
    author:'',
    isCheckedOut:false,
    rating:0

  } 
  @Output() ratingClicked: EventEmitter<IBook> = new EventEmitter<IBook>(); 
  constructor() { }

  ngOnChanges() {
    console.log("ngOnChanges")
  }
  

  click(rating: number): void { 
    this.book!.rating = rating; 
    this.ratingClicked.emit(this.book); 

  } 
}
