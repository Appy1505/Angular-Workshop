import { HttpClient  } from '@angular/common/http'; 
import { throwError, Observable } from 'rxjs'; 
import { map, catchError,debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'; 
import { Injectable } from '@angular/core';
import { IBook } from '../ibook';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  booksUrl = 'https://bookservicelaurie.azurewebsites.net/api/books';
  constructor(private http: HttpClient) { }

  private handleError(error: any) { 
    let errMsg = (error.message) ? error.message : error.status ?  
    `${error.status} - ${error.statusText}` : 'Server error'; 
    console.error(errMsg); 
    return throwError(errMsg); 
  } 
   
  search(terms: Observable<string>) { 
    return terms 
      .pipe( 
        debounceTime(400),
        distinctUntilChanged(), 
        switchMap(term => this.getBooks(term))
      ); 
  } 

  getBooks(query?: string): Observable<IBook[]> { 
  return this.http.get<IBook[]>(this.booksUrl) 
    .pipe( 
      map((books: IBook[]) => { 
        if (query != null && query.length > 0) {
          books = books.filter( 
            data => data.author.includes(query) || data.title.includes(query)) 
        } 
        return books; 
      }), 
      catchError(this.handleError)); 
  }
}

