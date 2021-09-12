import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Medicamento } from '../interfaces/medicamento';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private endPoint = 'http://localhost:7079/rest';
  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }

  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.endPoint + '/medicamentos');
  }
  getMedicamento(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.endPoint}/medicamentos/${id}`)
      .pipe( // para poder usar metodos rxjs
        catchError(e => { // catch error caputra los errores mandados por el servidor
          this.router.navigate(['/clientes']);
          console.log("ERROR AL INGRESAR POR RUTA GET UN ID QUE NO EXISTE");
          Swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  create(medicamento: Medicamento): Observable<Medicamento | any> {
    return this.http.post<Medicamento>(`${this.endPoint}/medicamentos`, medicamento, { headers: this.httpHeader })
      .pipe(
        catchError(e => {
          console.log("ERROR AL INGRESAR POR RUTA POST");
          Swal.fire(e.error.error, e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  update(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.endPoint}/medicamentos/${medicamento.idMedicamento}`, medicamento, { headers: this.httpHeader })
      .pipe(
        catchError(e => {
          console.log("ERROR AL ACTUALIZAR MEDICAMENTO POR METODO PUT")
          Swal.fire('Error al editar medicamento', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }
  delete(id: number): Observable<Medicamento> {
    return this.http.delete<Medicamento>(`${this.endPoint}/medicamentos/${id}`, { headers: this.httpHeader })
      .pipe(catchError(e => {
        console.log("ERROR AL ELIMINAR MEDICAMENTO POR METODO DELETE");
        Swal.fire('Error al eliminar medicamento', e.error.mensaje, 'error');
        return throwError(e);
      }));
  }
}
