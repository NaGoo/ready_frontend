import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select'; 
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination'

import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatInputModule} from '@angular/material/input'; 
import { AppComponent }      from './app.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceComponent } from './service/service.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { ToastrModule } from 'ngx-toastr';
// import { ClientMasterComponent } from './client-master/client-master.component';

@NgModule({
  imports: [
    BrowserModule,MatPaginatorModule,
    MatToolbarModule,
    MatSelectModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
    
    
  ],
  declarations: [
    AppComponent,
    ServiceComponent,
    ClientMasterComponent,

  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {  }
