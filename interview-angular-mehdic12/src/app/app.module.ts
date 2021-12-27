import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { NearestComponent } from './nearest/nearest.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';  

import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { ToolbarService } from '@syncfusion/ej2-angular-grids';
import {PdfExportService, ExcelExportService  } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    NearestComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PageService, SortService, FilterService, GroupService,ToolbarService, PdfExportService,ExcelExportService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
