import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from './shared/materials/materials.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomPopUpComponent } from './shared/components/custom-pop-up/custom-pop-up.component';
import { ComingSoonComponent } from './shared/components/coming-soon/coming-soon.component';
import { ConfirmationPopUpComponent } from './shared/components/confirmation-pop-up/confirmation-pop-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ConfirmationPopUpComponent,
    CustomPopUpComponent,
    ComingSoonComponent,
    
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialsModule,
    BrowserModule, 
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
