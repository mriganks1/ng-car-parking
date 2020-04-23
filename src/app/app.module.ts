import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ListComponent } from "./list/list.component";
import { CarFormComponent } from './car-form/car-form.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ListComponent, CarFormComponent],
  imports: [BrowserModule, ReactiveFormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
