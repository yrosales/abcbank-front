import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.sass']
})
export class ContactEditComponent implements OnInit {

  form: FormGroup;

  @Output() formData = new EventEmitter<any>();

  constructor( public fb: FormBuilder){
    this.form = this.fb.group({
      firstName: [''],
      secondName: [''],
      addresses: [''],
      dateOfBirth: [''],
      phoneNumbers: [''],
      personalPhoto: ['']
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.formData.emit(this.form.value);
  }
}
