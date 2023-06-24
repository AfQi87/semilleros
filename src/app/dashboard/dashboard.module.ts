import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighchartsChartModule } from 'highcharts-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGestionComponent } from './users/user-gestion/user-gestion.component';
import { UserQueryComponent } from './users/user-query/user-query.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { SemilleroGestionComponent } from './semillero/semillero-gestion/semillero-gestion.component';
import { SemilleroQueryComponent } from './semillero/semillero-query/semillero-query.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ProjectGestionComponent } from './project/project-gestion/project-gestion.component';
import { ProjectQueryComponent } from './project/project-query/project-query.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
     UserGestionComponent, UserQueryComponent, SemilleroGestionComponent, SemilleroQueryComponent, ProjectGestionComponent, ProjectQueryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    FormsModule,
    SelectButtonModule,
    ToastModule,
    AlifeFileToBase64Module,
    PdfViewerModule,
    MultiSelectModule,
  ]
})
export class DashboardModule { }
