import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo';
import { Tiposasesoria } from '../models/tiposasesoria';
import { Asesoria } from '../models/asesoria';
import { Sesion } from '../models/sesion';
import { Asistencia } from '../models/asistencia';
import { Maestro } from '../models/maestro';
import { Admin } from '../models/admin';
import { Pdf } from '../models/pdf';
import { Encabezado } from '../models/encabezado';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

grupoURL = 'http://localhost/webservice/api/';
//https://isma7.000webhostapp.com/api/catalogo/index
//http://104.197.200.77/

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Grupo[]> {
    return this.httpClient.get<Grupo[]>(this.grupoURL + 'index');
  }

  public tipos(): Observable<Tiposasesoria[]> {
    return this.httpClient.get<Tiposasesoria[]>(this.grupoURL + 'catalogo/tipos');
  }

  public detalle(id: number): Observable<Grupo[]> {
    return this.httpClient.get<Grupo[]>(this.grupoURL + 'catalogo/' + `find/${id}`, cabecera);
  }

  public crear(asesoria: Asesoria): Observable<any> {
    return this.httpClient.post<any>(this.grupoURL + 'insertasesoria/asesoria', asesoria, cabecera);
  }

  public sesion(id: number): Observable<Sesion[]> {
    return this.httpClient.get<Sesion[]>(this.grupoURL + 'catalogo/' + `sesion/${id}`, cabecera);
  }

    public unasesion(id: number): Observable<Sesion> {
    return this.httpClient.get<Sesion>(this.grupoURL + 'catalogo/' + `unasesion/${id}`, cabecera);
  }

  public asistencia(id: number, nu: number, as:number): Observable<Asistencia[]> {
    return this.httpClient.get<Asistencia[]>(this.grupoURL + 'catalogo/' + `asistencia/${id}`+`/${nu}`+`/${as}`, cabecera);
  }

    public crearasistencia (id: number, asistencia: Asistencia): Observable<any> {
    return this.httpClient.post<any>(this.grupoURL + 'insertlista/' + `lista/${id}`, asistencia, cabecera);
  }

  public maestros(): Observable<Maestro[]> {
    return this.httpClient.get<Maestro[]>(this.grupoURL + 'catalogo/maestros');
  }

    public admin(id: number): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(this.grupoURL + 'catalogo/' + `admin1/${id}`);
  }

      public pdf (id: number): Observable<any> {
    return this.httpClient.get<any>(this.grupoURL + 'catalogo/' + `pdf/${id}`);
  }

    public encabezado (id: number): Observable<any> {
    return this.httpClient.get<any>(this.grupoURL + 'catalogo/' + `encabezado/${id}`);
  }

}