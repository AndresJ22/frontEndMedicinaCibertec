import { Component, OnInit } from '@angular/core';
import { Medicamento } from '../../interfaces/medicamento';
import { MedicamentosService } from '../../services/medicamentos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-obtener-medicamento',
  templateUrl: './obtener-medicamento.component.html',
  styleUrls: ['./obtener-medicamento.component.scss']
})
export class ObtenerMedicamentoComponent implements OnInit {

  public medicamento: Medicamento =
    {
      nombre: '',
      laboratorio: ''
    };
  constructor(private medicamentoService: MedicamentosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarMedicamento();
  }

  cargarMedicamento() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.medicamentoService.getMedicamento(id)
          .subscribe((resp) => {
            console.log(resp);
            this.medicamento = resp
          });
      }
    })
  }

  create(): void {
    this.medicamentoService.create(this.medicamento)
      .subscribe(() => {
        console.log('Objeto Creado');
        this.router.navigate(['/medicamentos']);
        Swal.fire({
          icon: 'success',
          title: `Nuevo medicamento añadido ${this.medicamento.nombre} con exito`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      });
  }

  update(): void {
    this.medicamentoService.update(this.medicamento)
      .subscribe(resp => {
        this.router.navigate(['/medicamentos']);
        console.log(resp);
        Swal.fire(
          'Medicamento Actualizado',
          `Medicamento ${this.medicamento.nombre} Actualizado con exito `,
          'success'
        )
      });
  }
}
