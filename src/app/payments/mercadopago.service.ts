import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preference } from './payments-gateway/payments.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {
  //private apiUrl = 'http://localhost:8000/payments/create_preference/'; // Asegúrate de usar la URL correcta
  private apiUrl: string = environment.apiUrl+'/payments/create_preference/';

  constructor(private http: HttpClient) {}

  createPreference(preference: Preference): Observable<any> {
    return this.http.post(this.apiUrl,  preference);
  }
}
