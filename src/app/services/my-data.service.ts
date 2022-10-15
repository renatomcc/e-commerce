import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  constructor(private http: HttpClient) { }

  getData() {
    const data = this.http.get('https://fakestoreapi.com/products')
    return data;
  }
}
