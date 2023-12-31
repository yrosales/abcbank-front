import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Address } from './models/address';
import { ActionContact, Contact } from './models/contact';
import { PhoneNumber } from './models/phoneNumber';

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
      this.addContactsAddresses(addresses);
      this.getContacts();
      this.cleanEdition = true;
    });
  }

  private addContactsPhoneNumbers(phoneNumbers: PhoneNumber[]) {
    this.contactService
      .addContactPhoneNumbers(phoneNumbers)
      .subscribe((resp) => {});
  }

  private addContactsAddresses(addresses: Address[]) {
    return this.contactService
      .addContactAddresses(addresses)
      .subscribe((resp) => {});
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
    } else if (actionContact.action === 'update') {
      this.contactService
        .deleteContactPhoneNumbers(this.selectedContact.phoneNumbers)
        .subscribe((resp) => {});

      this.contactService
        .deleteContactAddresses(this.selectedContact.addresses)
        .subscribe((resp) => {});

      const body: Contact = {
        firstName: actionContact.contact.firstName,
        secondName: actionContact.contact.secondName,
        dateOfBirth: actionContact.contact.dateOfBirth,
        personalPhoto: actionContact.contact.personalPhoto,
      };
      this.contactService
        .updateContact(body, this.selectedContact.id)
        .subscribe(
          (resp) => {
            const phoneNumbers = actionContact.contact.phoneNumbers.map(
              (item) => {
                const phoneNumber: PhoneNumber = {
                  number: item.number,
                  contact: resp,
                };
                return phoneNumber;
              }
            );
            const addresses = actionContact.contact.addresses.map((item) => {
              const address: Address = {
                address: item.address,
                contact: resp,
              };
              return address;
            });
            this.addContactsPhoneNumbers(phoneNumbers);
            this.addContactsAddresses(addresses);
            this.getContacts();
          },
          (error) => console.log('error')
        );
    }
  }

  deleteContact(contact: Contact) {
    contact.isDeleting = true;
    this.contactService.deleteContact(contact.id).subscribe({
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
    if (!contact.isDeleting) {
      this.selectedContact = contact;
      this.cleanEdition = false;
    }
  }
}
