import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private baseUrl: string = "http://localhost:3000/products";
  private _products: Product[] = [];

  constructor(private http: HttpClient) { }

  get products() : Product[]{
    return [...this._products];
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ this.baseUrl }`)
  }

  getProductById( id: string ): Observable<Product>{
    return this.http.get<Product>(`${ this.baseUrl }/${ id }`)
  }

  postProduct( product: Product ): Observable<Product>{
    return this.http.post<Product>(`${ this.baseUrl }`, product);
  }

  updateProduct( product: Product ): Observable<Product>{
    return this.http.put<Product>(`${ this.baseUrl }/${ product._id }`, product);
  }

  deleteProduct( id: string ): Observable<any>{
    return this.http.delete(`${ this.baseUrl }/${ id }`)
  }
}
