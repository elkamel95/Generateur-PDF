import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 
import { AppComponent } from './app.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { FormComponent } from './Layout/form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
 import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  { path: '', component:LayoutComponent  }
];
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
     RouterModule.forRoot(routes),
     ReactiveFormsModule,
     BrowserAnimationsModule,
     MatFormFieldModule,
     HttpClientModule,
     MatInputModule,
     MatButtonModule,
     MatCardModule,
     MatSidenavModule,
     FlexLayoutModule,
     MatListModule,
     MatToolbarModule,
     MatSnackBarModule,
     NgxSpinnerModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [ MatFormFieldModule, MatInputModule ],

  bootstrap: [AppComponent]
})
export class AppModule { }