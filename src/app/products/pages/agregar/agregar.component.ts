import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    _id: [''],
    name: ['', [Validators.required]] ,
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    status: ['a', [Validators.required]]
  })

  error: boolean = false;
  success: boolean = false;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(
          ({id}) => {
            if(!id){
              return EMPTY;
            }
            return this.productService.getProductById(id);
          } 
        )
      )
      .subscribe(
        product => {
          this.formulario.reset({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            status: product.status
          }) 
        }
      )
  }

  get priceError(): string{
    const errors = this.formulario.get('price')?.errors;
    if( errors?.['required'] ){
      return 'Este campo es obligatorio'
    }
    if( errors?.['min'] ){
      return 'El precio no puede ser menor a 0'
    }
    return '';
  }

  submit(){
    this.success = false;
    if( this.formulario.invalid ){
      this.formulario.markAllAsTouched();
      return;
    }
    if(this.formulario.controls['_id'].value){
      this.productService.updateProduct( this.formulario.value )
        .subscribe( resp => {
            this.success = true;
            this.formulario.reset();
            this.router.navigate(['/'])
        })
      return;
    }
    this.productService.postProduct( this.formulario.value )
    .subscribe( resp => {
      if( resp ){
        this.success = true;
      }else{
        this.error = true;
      }
    })
    this.formulario.reset();
    this.router.navigate(['/'])
  }

  validarCampo( campo:string ){
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }
}
