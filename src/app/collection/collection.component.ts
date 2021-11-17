import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBook } from '../ibook';
import { DataService } from '../services/data.service'; 

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  pageTitle = "Books";
  books: Array<IBook> = [];
  showOperatingHours : boolean = false;
  openingTime: Date;
  closingTime: Date;

constructor(private snackBar: MatSnackBar,private dataService: DataService) {
  this.openingTime = new Date();
  this.openingTime.setHours(10,0);
  this.closingTime = new Date();
  this.closingTime.setHours(15,0);
 }

  ngOnInit() {
    this.books = this.dataService.getBooks();
  }
  updateMessage(message: string, type: string): void { 
    if (message) { 
        this.snackBar.open(`${type}: ${message}`, 'DISMISS', { 
           duration: 3000 
        });
    } 
  } 

  onRatingUpdate(book: IBook): void { 
    this.updateMessage(book.title, " Rating has been updated"); 
   } 

}
