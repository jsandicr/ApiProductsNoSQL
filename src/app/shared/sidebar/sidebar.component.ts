import { Component } from '@angular/core';

interface MenuItem{
  nombre: string;
  ruta  : string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
    .activo{
      background-color: #47b5ff;
      color: #dff6ff;
    }
    `
  ]
})
export class SidebarComponent {
  items: MenuItem[] = [
    {
      nombre: "Ver Productos",
      ruta: "../products/products"
    },
    {
      nombre: "Agregar",
      ruta: "../products/agregar"
    }
  ];
}
