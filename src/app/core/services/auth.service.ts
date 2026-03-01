import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API = 'http://localhost:5051/api/auth/';

  constructor(private http: HttpClient) { }
  //qui passo il DTO che gli passo al backend, se voglio posso creare un'interfaccia per questo DTO, ma non è strettamente necessario
  public login(username: string, password: string): Observable<any> {
    // Invia i dati al backend
    return this.http.post(this.AUTH_API + 'signin', { username, password });
  }

  // Metodo per salvare i dati nel browser
  public saveUser(user: any): void {
    // Pulizia preventiva del SessionStorage
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.removeItem('auth-token');

    // 1. Salviamo il Token (indispensabile per l'Interceptor) nel sessionStorage
    // Usiamo 'accessToken' perché è il nome che abbiamo messo nel DTO Java
    if (user.accessToken) {
      window.sessionStorage.setItem('auth-token', user.accessToken);
    }

    // 2. Salviamo l'intero oggetto (id, username, role) per la UI
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));
  }

  // Recupera il token per l'Interceptor
  public getToken(): string | null {
    return window.sessionStorage.getItem('auth-token');
  }

  // Metodo per recuperare l'utente salvato
  public getUser(): any {
    const user = window.sessionStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }

  // Controlla se l'utente è loggato
  public isLoggedIn(): boolean {
    return !!window.sessionStorage.getItem('auth-token'); // Restituisce true se il token esiste, altrimenti false
  }

  // Metodo per il logout
  public logout(): void {
    window.sessionStorage.clear();
  }
}