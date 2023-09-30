import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact, ActionContact } from '../models/contact';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.sass'],
})
export class ContactEditComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Output() formData = new EventEmitter<ActionContact>();
  @Input() clean: boolean;
  @Input() contactToEdit: Contact;

  public isEditing: boolean = false;

  constructor(public fb: FormBuilder, private datePipe: DatePipe) {
    this.form = this.fb.group({
      firstName: [''],
      secondName: [''],
      addresses: [''],
      dateOfBirth: [''],
      phoneNumbers: [''],
      personalPhoto: [''],
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    this.formData.emit({
      action: !this.isEditing ? 'create' : 'update',
      contact: this.form.value,
    });
    this.isEditing = false;
    this.cleanForm();
  }

  cleanForm() {
    this.form.reset();
  }

  private initForm(contact: Contact) {
    this.form.setValue({
      firstName: contact.firstName,
      secondName: contact.secondName,
      addresses: contact.addresses,
      dateOfBirth: this.datePipe.transform(contact.dateOfBirth,"yyyy-MM-dd"),
      phoneNumbers: contact.phoneNumbers,
      personalPhoto: contact.personalPhoto,
    });
  }

  public cancelEdit() {
    this.cleanForm();
    this.isEditing = false;
    this.contactToEdit = null;
  }

  ngOnChanges() {
    if (this.clean) {
      this.cleanForm();
      this.clean = false;
    } else if (this.contactToEdit) {
      this.initForm(this.contactToEdit);
      this.isEditing = true;
    }
  }
}
