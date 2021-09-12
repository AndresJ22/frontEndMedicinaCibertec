import { Component, OnInit } from '@angular/core';
import { Medicamento } from '../../interfaces/medicamento';
import { MedicamentosService } from '../../services/medicamentos.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.scss']
})
export class MedicamentoComponent implements OnInit {
  medicamentos: Medicamento[] = [];
  constructor(private medicamentoService: MedicamentosService) { }

  ngOnInit(): void {
    this.medicamentoService.getMedicamentos().subscribe(resp => {
      this.medicamentos = resp;
    })
  }
  delete(medicamento: Medicamento): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que desea eliminar al cliente ${medicamento.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicamentoService.delete(medicamento.idMedicamento!).subscribe(resp => {
          this.medicamentos = this.medicamentos?.filter(resp => resp !== medicamento);
          Swal.fire(
            'Medicamento Eliminado!',
            `Medicamento ${medicamento.nombre} eliminado con exito`,
            'success'
          )
        })
      }
    })
  }
}
