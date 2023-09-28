import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.sass'],
})
export class ContactFilterComponent implements OnInit {
  form: FormGroup;

  @Output() filterData = new EventEmitter<any>();

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: [''],
      fromAge: [''],
      toAge: [''],
    });
  }

  ngOnInit(): void {}

  filterByName() {
    this.filterData.emit({
      by: 'name',
      name: this.form.value.firstName,
    });
  }

  filterByAge() {
    this.filterData.emit({
      by: 'age',
      from: this.form.value.fromAge,
      to: this.form.value.toAge,
    });
  }
}
