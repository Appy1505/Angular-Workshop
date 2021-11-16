import { Component, OnInit } from '@angular/core';
import { IBook } from '../ibook';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  pageTitle = "Books";
  books:Array<IBook> =
  [
    {
      id:1,
      title:"JavaScript - The Good Parts",
      author:"Douglous Crockford",
      isCheckedOut : true,
      rating: 3
  },
  {
    id:2,
    title:"The Wind In the Windows",
    author:"Douglous Crockford",
    isCheckedOut : false,
    rating: 4
},
{
  id:3,
  title:"Pillers of the Earth",
  author:"Douglous Crockford",
  isCheckedOut : true,
  rating: 5
}
];
  showOperatingHours : boolean = false;
  openingTime: Date;
  closingTime: Date;

constructor() {
  this.openingTime = new Date();
  this.openingTime.setHours(10,0);
  this.closingTime = new Date();
  this.closingTime.setHours(15,0);
 }

  ngOnInit(): void {
  }

}