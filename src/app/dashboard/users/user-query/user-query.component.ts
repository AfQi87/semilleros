import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { UserGestionComponent } from '../user-gestion/user-gestion.component';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-query',
  templateUrl: './user-query.component.html',
  styleUrls: ['./user-query.component.scss'],
})
export class UserQueryComponent implements OnInit {

  users: any = [];
  lists: any[] | undefined;

  selected: string | undefined;
  constructor(
    private _userService: UserService,
    private _dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.lists = [
      { name: 'Estudiante', code: 'ES' },
      { name: 'Coordinador', code: 'CO' },
    ];
    this.reloadTable();
  }

  reloadTable() {
    this.selected = ""
    this._userService.getUsers().subscribe({
      next: (info: any) => {
        let data = info.map((item: any) => {
          console.log("item: ", item);

          return {
            "id": item.user.length > 0 ? item.user[0].id : item.userC[0].id,
            "semestre": item.user.length > 0 ? item.user[0].semestre : null,
            "acuerdo_nombramiento": item.userC.length > 0 ? item.userC[0].acuerdo_nombramiento : null,
            "archivo_nombramiento": item.userC.length > 0 ? item.userC[0].archivo_nombramiento : null,
            "usuario": {
              "id": item.id,
              "nombre": item.nombre,
              "identificacion": item.identificacion,
              "direccion": item.direccion,
              "correo": item.correo,
              "telefono": item.telefono,
              "fecha_nacimiento": item.fecha_nacimiento,
              "fecha_vinculacion": item.fecha_vinculacion,
              "genero_id": item.genero.id,
              "genero": item.genero,
              "tipo_usuario_id": item.tipo_usuario_id,
              "tipo": item.tipo,
              "estado_usuario_id": item.estado_usuario_id,
              "estado": item.estado
            },
          }
        })

        this.users = data
      },
      error: (error: HttpErrorResponse) => {

      }
    })
  }

  onChange(event: any) {
    console.log("event: ", event);
    const ref = this._dialogService.open(UserGestionComponent, {
      data: {
        estatus: 'add',
        type: event.value.name,
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

  viewItem(item: any) {
    console.log("item: ", item);


    const ref = this._dialogService.open(UserGestionComponent, {
      data: {
        estatus: 'view',
        type: item.usuario.tipo.descripcion,
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

  editItem(item: any) {
    const ref = this._dialogService.open(UserGestionComponent, {
      data: {
        estatus: 'edit',
        type: item.usuario.tipo.descripcion,
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

  deleteItem(item: any) {
    Swal.fire({
      // title: 'Are you sure?',
      text: "¿Desea activar/desactivar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(item.usuario.id).subscribe({
          next: (info: any) => {
            this.reloadTable();
          }
        })
      }
    })


  }

  onConfirm() {

  }
}
