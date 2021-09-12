import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedSocialRoutingModule } from './red-social-routing.module';
import { MedicamentoComponent } from './pages/medicamento/medicamento.component';
import { ObtenerMedicamentoComponent } from './pages/obtener-medicamento/obtener-medicamento.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MedicamentoComponent,
    ObtenerMedicamentoComponent

  ],
  exports: [
    MedicamentoComponent
  ],
  imports: [
    CommonModule,
    RedSocialRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class RedSocialModule { }
