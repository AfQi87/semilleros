import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SemilleroService } from 'src/app/services/semillero.service';
import { SemilleroGestionComponent } from '../semillero-gestion/semillero-gestion.component';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-semillero-query',
  templateUrl: './semillero-query.component.html',
  styleUrls: ['./semillero-query.component.scss']
})
export class SemilleroQueryComponent implements OnInit {

  semilleros: any = [];

  constructor(
    private _semilleroService: SemilleroService,
    private _dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.reloadTable();
  }

  reloadTable() {
    this._semilleroService.getLst().subscribe({
      next: (info: any) => {
        this.semilleros = info
      },
      error: (error: HttpErrorResponse) => {

      }
    })
  }

  onAdd(event: any) {
    const ref = this._dialogService.open(SemilleroGestionComponent, {
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
    const ref = this._dialogService.open(SemilleroGestionComponent, {
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


    const ref = this._dialogService.open(SemilleroGestionComponent, {
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
      text: "¿Desea activar/desactivar el semillero?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._semilleroService.deleteData(item.id).subscribe({
          next: (info: any) => {
            this.reloadTable();
          }
        })
      }
    })


  }
}
