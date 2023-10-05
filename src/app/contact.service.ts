import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from './models/address';
import { Contact } from './models/contact';
import { PhoneNumber } from './models/phoneNumber';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/';

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url + 'contacts');
  }

  getContactsFilterByName(name: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.url}contacts/${name}`);
  }

  getContactsFilterByAge(from: number, to: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.url}contacts/${from}/${to}`);
  }

  addContact(body: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.url}contacts`, body);
  }

  addContactPhoneNumber(body: PhoneNumber): Observable<PhoneNumber> {
    return this.http.post<PhoneNumber>(`${this.url}phone-number`, body);
  }

  addContactPhoneNumbers(body: PhoneNumber[]) {
    return this.http.post(`${this.url}phone-numbers`, body);
  }

  deleteContactPhoneNumber(id: number) {
    return this.http.delete(`${this.url}phone-number/${id}`, {
      responseType: 'text',
    });
  }

  deleteContactPhoneNumbers(body: PhoneNumber[]) {
    //return this.http.delete(`${this.url}phone-numbers`, {body});
    return this.http.request('delete', `${this.url}contact-phone-numbers`, {
      body: body,
      responseType: 'text',
    });
  }

  addContactAddress(body: Address) {
    return this.http.post<Address>(`${this.url}address`, body);
  }

  addContactAddresses(body: Address[]) {
    return this.http.post(`${this.url}addresses`, body);
  }

  deleteContactAddress(id: number) {
    return this.http.delete(`${this.url}address/${id}`, {
      responseType: 'text',
    });
  }

  deleteContactAddresses(body: Address[]) {
    //return this.http.delete(`${this.url}phone-numbers`, {body});
    return this.http.request('delete', `${this.url}contact-addresses`, {
      body: body,
      responseType: 'text',
    });
  }

  updateContact(body: Contact, id: number): Observable<Contact> {
    return this.http.put<Contact>(`${this.url}contacts/${id}`, body);
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.url}contacts/${id}`, {
      responseType: 'text',
    });
  }
}
