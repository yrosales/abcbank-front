import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { ActionContact, Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'Contacts';

  contacts: Contact[];
  public cleanEdition: boolean = false;
  public isDeleting: boolean = false;
  public selectedContact: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
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
      this.contactService.addContact(actionContact.contact).subscribe(
        (response) => {
          this.getContacts();
          this.cleanEdition = true;
        },
        (error) => console.log('error')
      );
    } else if (actionContact.action === 'update') {
      this.contactService.updateContact(actionContact.contact,this.selectedContact.id).subscribe(
        (response) => {
          this.getContacts();
          this.cleanEdition = true;
        },
        (error) => console.log('error')
      );
    }
  }

  deleteContact(id: number) {
    this.isDeleting = true;
    this.contactService.deleteContact(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getContacts();
        this.isDeleting = false;
      },
      error: (e) => console.error(e),
    });
  }

  onSelectContact(contact: Contact) {
    if (!this.isDeleting){
      this.selectedContact = contact;
    }
  }
}
