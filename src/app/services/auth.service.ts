import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginUsuario } from '../models/login-usuario';
import { Observable } from 'rxjs';
import { JwtModel } from '../models/jwt-model';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

private authURL = 'http://localhost/webservice/api/token/';
//private authURL = 'https://isma7.000webhostapp.com/api/token/';
//https://isma7.000webhostapp.com/api/catalogo/index
//http://104.197.200.77/

  constructor(private httpClient: HttpClient) { }

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL + 'login', usuario);
  }

}
