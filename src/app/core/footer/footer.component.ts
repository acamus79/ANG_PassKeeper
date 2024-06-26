import { Component, OnInit } from '@angular/core';
import {NewsletterService} from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent{
  mensaje:string = '';
  error:string = '';
  correoElectronico:string = '';

  constructor(private newsletterService: NewsletterService) {}

  registrarCorreo() {
    if (this.correoElectronico.trim() !== '') {
      this.newsletterService.postNewsletter(this.correoElectronico).subscribe(
        () => {
          this.mensaje = 'Correo registrado exitosamente.';
          this.correoElectronico = ''; // Limpiar el campo de correo electrónico después de registrar
        },
        (error) => {
          if (error.status === 400) {
            this.error = 'Error: ' + error.error.email;
          } else {
            this.error = 'Error al registrar el correo.';
          }
        }
      );
    } else {
      this.error = 'Ingresa tu correo electrónico.';
    }
  }

  limpiarMensaje() { //para limpiar los mensajes cuando se modifica el input
    this.mensaje = '';
    this.error = '';
  }
}
