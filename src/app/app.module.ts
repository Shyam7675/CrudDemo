import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {HttpClientModule} from '@angular/common/http' 
// Services
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
