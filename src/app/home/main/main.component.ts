import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  isLogged = false;
  user: any;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.getIsLogged().subscribe(logged => {
      this.isLogged = logged;

      if (logged) {
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
        }
      } else {
        this.user = null;
      }
    });
  }

  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  onButtonClick() {
    if (this.isLogged) {
      // Redirige a la URL deseada cuando el usuario está logeado
      this.router.navigate(['/ruta-destino']);
    } else {
      // Redirige a la página de login si el usuario no está logeado
      this.router.navigate(['/login']);
    }
  }
}

