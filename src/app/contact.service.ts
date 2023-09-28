import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  private url = "http://localhost:8080/";

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url + "contacts");
  }

  addContact(body:Contact): Observable<Contact> {
    return this.http.post<Contact>(this.url + "contacts", body);
  }
}
