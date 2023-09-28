import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./models/contact";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent implements OnInit {
  title = "Contacts";

  contacts: Contact[];

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

  addContact(contact: Contact): void {
    this.contactService.addContact(contact).subscribe(
      (response) => {
        console.log(response);
        this.getContacts();
      },
      (error) => console.log('error')
    );
  }
}
