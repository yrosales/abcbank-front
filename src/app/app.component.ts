import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { ActionContact, Contact } from './models/contact';
import { PhoneNumber } from './models/phoneNumber';
import { Address } from './models/address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'Contacts';

  contacts: Contact[];
  public cleanEdition: boolean = false;
  public selectedContact: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  private callAddContact(contact: Contact) {
    const body: Contact = {
      firstName: contact.firstName,
      secondName: contact.secondName,
      dateOfBirth: contact.dateOfBirth,
      personalPhoto: contact.personalPhoto,
    };
    this.contactService.addContact(body).subscribe((resp) => {
      const phoneNumbers = contact.phoneNumbers.map((item) => {
        item.contact = resp;
        return item;
      });
      const addresses = contact.addresses.map((item) => {
        item.contact = resp;
        return item;
      });
      this.addContactsPhoneNumbers(phoneNumbers);
      this.addContactsAddress(addresses);
      this.getContacts();
      this.cleanEdition = true;
    });
  }  

  private addContactsPhoneNumbers(phoneNumbers: PhoneNumber[]) {
    phoneNumbers.forEach((element, index) => {
      return this.contactService
        .addContactPhoneNumber(element)
        .subscribe((resp) => {});
    });
  }

  private addContactsAddress(addresses: Address[]) {
    addresses.forEach((element, index) => {
      return this.contactService
        .addContactAddress(element)
        .subscribe((resp) => {});
    });
  }

  private deleteContactsPhoneNumbers(phoneNumbers: PhoneNumber[]) {
    phoneNumbers.forEach((element) => {
      return this.contactService
        .deleteContactPhoneNumber(element.id)
        .subscribe((resp) => {});
    });
  }

  private deleteContactsAddress(addresses: Address[]) {
    addresses.forEach((element) => {
      return this.contactService
        .deleteContactAddress(element.id)
        .subscribe((resp) => {});
    });
  }

  
  private getContacts() {
    this.contactService.getContacts().subscribe(
      (resp) => {
        this.contacts = resp;
      },
      (error) => console.log(error)
    );
  }

  filterContacts(filterData) {
    if (filterData.by === 'name') {
      this.contactService.getContactsFilterByName(filterData.name).subscribe(
        (resp) => {
          this.contacts = resp;
        },
        (error) => console.log(error)
      );
    } else if (filterData.by === 'age') {
      this.contactService
        .getContactsFilterByAge(filterData.from, filterData.to)
        .subscribe(
          (resp) => {
            this.contacts = resp;
          },
          (error) => console.log(error)
        );
    }
  }

  onActionContact(actionContact: ActionContact) {
    if (actionContact.action === 'create') {
      this.callAddContact(actionContact.contact);
    // } else if (actionContact.action === 'update') {
    //   this.deleteContactsPhoneNumbers(this.selectedContact.phoneNumbers);
    //   this.deleteContactsAddress(this.selectedContact.addresses);
      this.contactService
        .updateContact(actionContact.contact, this.selectedContact.id)
        .subscribe(
          (response) => {
            this.getContacts();
          },
          (error) => console.log('error')
        );
    }
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getContacts();
        this.selectedContact = null;
        this.cleanEdition = true;
      },
      error: (e) => console.error(e),
    });
  }

  onSelectContact(contact: Contact) {
    this.selectedContact = contact;
  }
}
