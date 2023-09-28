import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'Contacts';

  contacts: Contact[];

  constructor(
    private contactService: ContactService,
    private detect: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  private getContacts() {
    this.contactService.getContacts().subscribe(
      (resp) => {
        this.contacts = resp;
        this.detect.detectChanges();
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

  addContact(contact: Contact) {
    this.contactService.addContact(contact).subscribe(
      (response) => {
        this.getContacts();
      },
      (error) => console.log('error')
    );
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe((response) => {
      console.log(response);
      this.getContacts();
    });
  }
}
