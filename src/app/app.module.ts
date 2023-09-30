import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactFilterComponent } from './contact-filter/contact-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactEditComponent,
    ContactFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
