import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBook } from '../ibook';
import { DataService } from '../services/data.service'; 
import { Subject } from 'rxjs'; 
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
  searchTerm$ = new Subject<string>();
constructor(private snackBar: MatSnackBar,private dataService: DataService) {
  this.openingTime = new Date();
  this.openingTime.setHours(10,0);
  this.closingTime = new Date();
  this.closingTime.setHours(15,0);
 }

  ngOnInit() {
    this.getBooks(); 
    this.dataService.search(this.searchTerm$)
       .subscribe(books => { 
         this.books = books; 
    }); 
  }
  updateMessage(message: string, type: string): void { 
    if (message) { 
        this.snackBar.open(`${type}: ${message}`, 'DISMISS', { 
           duration: 3000 
        });
    } 
  } 

  onSearchModified(event: Event) { 
     this.searchTerm$.next((event.target as HTMLInputElement).value); 
  }
    
  onRatingUpdate(book: IBook): void { 
    this.updateMessage(book.title, " Rating has been updated"); 
   } 
   getBooks(): void { 
    this.dataService.getBooks().subscribe( 
        books => this.books = books, 
        error => this.updateMessage(<any>error, 'ERROR'));
  } 

}
