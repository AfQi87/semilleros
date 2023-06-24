import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SemilleroService } from 'src/app/services/semillero.service';
import { ProjectGestionComponent } from '../project-gestion/project-gestion.component';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-project-query',
  templateUrl: './project-query.component.html',
  styleUrls: ['./project-query.component.scss']
})
export class ProjectQueryComponent implements OnInit {

  proyectos: any = [];

  constructor(
    private _projectService: ProjectService,
    private _dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.reloadTable();
  }

  reloadTable() {
    this._projectService.getLst().subscribe({
      next: (info: any) => {
        this.proyectos = info
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    })
  }

  onAdd(event: any) {
    const ref = this._dialogService.open(ProjectGestionComponent, {
      data: {
        status: 'add',
        element: {},
      },
      showHeader: false,
      closeOnEscape: true,
      closable: false,
      width: "80%",
    });

    ref.onClose.subscribe((response: any) => {
      this.reloadTable();
    });
  }

  editItem(item: any) {
    const ref = this._dialogService.open(ProjectGestionComponent, {
      data: {
        status: 'edit',
        element: item
      },
      showHeader: false,
      closeOnEscape: true,
      closable: false,
      width: "80%",
    });

    ref.onClose.subscribe((response: any) => {
      this.reloadTable();
    });
  }

  viewItem(item: any) {
    console.log("item: ", item);


    const ref = this._dialogService.open(ProjectGestionComponent, {
      data: {
        status: 'view',
        element: item
      },
      showHeader: false,
      closeOnEscape: true,
      closable: false,
      width: "80%",
    });

    ref.onClose.subscribe((response: any) => {
      if (response.data) {
        this.reloadTable();
      }
    });
  }

  deleteItem(item: any) {
    Swal.fire({
      // title: 'Are you sure?',
      text: "¿Desea activar/desactivar el proyecto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._projectService.deleteData(item.id).subscribe({
          next: (info: any) => {
            this.reloadTable();
          }
        })
      }
    })


  }
}
