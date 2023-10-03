import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact, ActionContact } from '../models/contact';
import { DatePipe } from '@angular/common';
import { PhoneNumber } from '../models/phoneNumber';
import { Address } from '../models/address';

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
  public phoneNumbers: PhoneNumber[] = [];
  public addresses: Address[] = [];

  constructor(public fb: FormBuilder, private datePipe: DatePipe) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
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
      contact: {
        firstName: this.form.value.firstName,
        secondName: this.form.value.secondName,
        dateOfBirth: this.form.value.dateOfBirth,
        personalPhoto: this.form.value.personalPhoto,
        phoneNumbers: this.phoneNumbers,
        addresses: this.addresses,
      },
    });
    this.isEditing = false;
    this.cleanForm();
  }

  cleanForm() {
    this.form.reset();
    this.phoneNumbers = [];
    this.addresses = [];
  }

  private initForm(contact: Contact) {
    this.form.setValue({
      firstName: contact.firstName,
      secondName: contact.secondName,
      dateOfBirth: this.datePipe.transform(contact.dateOfBirth, 'yyyy-MM-dd'),
      personalPhoto: contact.personalPhoto,
      phoneNumbers: '',
      addresses: '',
    });
    this.phoneNumbers = contact.phoneNumbers;
    this.addresses = contact.addresses;
  }

  public cancelEdit() {
    this.cleanForm();
    this.isEditing = false;
  }

  public onSelectPhoneNumber(phoneNumber: PhoneNumber) {}

  public deletePhoneNumber(phoneNumber:PhoneNumber) {
    this.phoneNumbers.splice(this.phoneNumbers.indexOf(phoneNumber),1);
  }

  public addPhoneNumber() {
    if (
      this.form.value.phoneNumbers &&
      !this.phoneNumbers.find((item) => {
        return parseInt(item.number) === this.form.value.phoneNumbers;
      })
    ) {
      this.phoneNumbers.push({ number: this.form.value.phoneNumbers, contact: this.contactToEdit });
      this.form.patchValue({ phoneNumbers: '' });
    }
  }

  public onSelectAddress(phoneNumber: PhoneNumber) {}

  public deleteAddress() {}

  public addAddress() {
    if (
      this.form.value.addresses &&
      !this.addresses.find((item) => {
        return item.address === this.form.value.addresses;
      })
    ) {
      this.addresses.push({ address: this.form.value.addresses });
      this.form.patchValue({ addresses: '' });
    }
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
