import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any = {};
  usuario: LoginUsuario;
  nombreUser: string;
  isLogged = false;
  isLoginFail = false;
  rol: string;
  id: number;
  errorMsg = 'Datos incorrectos';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
    // comprobamos los valores del token
      console.log('Nombre: ' + this.tokenService.getUserName());
      console.log('Token: ' + this.tokenService.getToken());
      console.log('Rol: ' + this.tokenService.getRol());
      console.log('Id: '+ Number(this.tokenService.getId()));

      this.nombreUser = this.tokenService.getUserName();
      this.isLogged = true;
      this.isLoginFail = false;
      this.rol = this.tokenService.getRol();
      this.id = Number(this.tokenService.getId());
  }
  }

  onLogin() {
    this.usuario = new LoginUsuario(this.form.username, this.form.password);

    this.authService.login(this.usuario).subscribe(data => {
      this.tokenService.setId(data.id.toString());
      this.tokenService.setUserName(data.username);
      this.tokenService.setRol(data.rol);
      this.tokenService.setToken(data.token);
      
      

      this.isLogged = true;
      this.isLoginFail = false;
      this.rol = this.tokenService.getRol();
      this.id = Number(this.tokenService.getId());
    },
      (err: any) => {
        console.log(err);
        this.isLogged = false;
        this.isLoginFail = true;
        //this.errorMsg = err.error.message;
        this.presentAlert();
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: this.errorMsg,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

onLogout() {
  this.tokenService.logOut();
  window.location.reload();
}

}

