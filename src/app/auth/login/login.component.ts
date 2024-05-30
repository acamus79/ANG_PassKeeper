import { Component, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials, LoginResponse } from '../auth.models';
import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() cerrarSesion = new EventEmitter<void>();
  
  loginForm!: FormGroup;
  credentialIncorrect=false
  public errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storeService: StoreService
  ) { }

  onClose() {
    this.cerrarSesion.emit();
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ]]
    });
  }
  ngOnDestroy(): void {

  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value;
      this.authService.logIn(credentials).subscribe({
        next:(response: LoginResponse) => {
          if (response.access && response.refresh && response.user) {
            this.storeService.setUser(response.user)
            this.storeService.setAccessToken(response.access)
            this.storeService.setRefreshToken(response.refresh)
            this.authService.setIsLogged(true)
            const userData = JSON.parse(this.storeService.getUser());
            if (userData) {
             
              if (userData && userData.is_staff) {
                this.onClose();
                console.log("es admin login")
                this.router.navigate(['admin/payments'])
              }else{
                this.onClose();
                this.router.navigate(['/payments/'])
              }
            }
            
          } else {
            // Maneja el caso donde no hay tokens en la respuesta.
            console.error('Invalid credentials', response);
          }
        },
        error: (err) => {
          let errorMessage = 'An error occurred during login.';
          if (err.status === 401) {
            this.credentialIncorrect=true
            errorMessage = 'Usuario o Contraseña incorrecto';
          }
          console.error(errorMessage);
          // Aquí podrías mostrar el mensaje de error en la interfaz de usuario

        }
    });
    }



  }

  // Función para obtener el estado de error de un campo específico
  fieldError(field: string): boolean {
    const formField = this.loginForm.get(field);
    return formField !== null && formField.invalid && (formField.dirty || formField.touched);
  }

  // Mensaje de error específico por campo. (Aqui agregar else if para mas validaciones)
  getErrorMessage(field: string): string {
    const formField = this.loginForm.get(field);
    if (formField?.hasError('required')) {
      return 'Este campo es obligatorio';
    } else if (formField?.hasError('email')) {
      return 'Ingrese un email válido';
    }
    return '';
  }

}






