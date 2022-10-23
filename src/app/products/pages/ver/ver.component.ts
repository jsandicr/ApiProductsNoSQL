import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: [
    `
      .swal2-popup{
        z-index: 10
      }
    `
  ]
})
export class VerComponent implements OnInit, OnDestroy {

  cargando: boolean = true;
  products: Product[] = [];
  getProducts!: Subscription;
  refreh = new BehaviorSubject<boolean>(true)

  constructor( private productService: ProductService,
               private dialog: MatDialog,
               private router: Router ){}

  ngOnDestroy(): void {
    this.getProducts.unsubscribe();
  }

  ngOnInit(): void {
    this.getProducts = this.productService.getProducts()
    .pipe(
      switchMap(() => this.productService.getProducts())
    )
      .subscribe( (resp) => {
        this.products = resp;
        this.cargando = false;
      })
  }

  borrar(position: number){
    let id = this.products[position]._id

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger me-3',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({  
      title: '¿Seguro que quiere eliminar el producto?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: '¡Si, eliminar!',  
      cancelButtonText: 'Cancelar'  
    }).then((result) => {
      if(result.value) {
        this.productService.deleteProduct( id )
        .subscribe( product => {
          if(product){
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado con exito!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        this.products.splice(position, 1)
      }
      //Recargar
      if(this.getProducts){
        this.getProducts.unsubscribe();
      }
      this.getProducts = this.productService.getProducts()
      .subscribe( (resp) => {
        this.cargando = false;
      })
    })
  }
}