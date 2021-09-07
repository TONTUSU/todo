import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MomentDateModule} from "@angular/material-moment-adapter"
import {MatSnackBarModule} from "@angular/material/snack-bar";

import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {RegisterPageComponent} from './register-page/register-page.component';
import {TodosPageComponent} from './todos-page/todos-page.component';
import {EditTodoDialogComponent} from './edit-todo-dialog/edit-todo-dialog.component';
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {environment} from "../environments/environment";

export const MAIN_API = [
  {
    provide: 'AUTH_API',
    useValue: environment.AUTH_API
  },
  {
    provide: 'TODO_API',
    useValue: environment.TODO_API
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    TodosPageComponent,
    DeleteDialogComponent,
    EditTodoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MomentDateModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'DD-MM-YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU'
    },
    MAIN_API

  ],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor() {
  }
}
