import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentoComponent } from './pages/medicamento/medicamento.component';
import { ObtenerMedicamentoComponent } from './pages/obtener-medicamento/obtener-medicamento.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'medicamentos',
        component: MedicamentoComponent
      },
      {
        path: 'form/:id',
        component: ObtenerMedicamentoComponent
      },
      {
        path: 'form',
        component: ObtenerMedicamentoComponent
      },
      {
        path: '',
        redirectTo: 'medicamentos',
        pathMatch: 'full'
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedSocialRoutingModule { }
