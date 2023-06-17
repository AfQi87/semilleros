import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';


@Component({
  selector: 'app-user-gestion',
  templateUrl: './user-gestion.component.html',
  styleUrls: ['./user-gestion.component.scss']
})
export class UserGestionComponent implements OnInit {
  public user: FormGroup = new FormGroup({});
  estudiante: boolean = false;
  visualizar: boolean = false;


  lists: any[] | undefined;
  selected: any | undefined;

  stateOptions: any[] | undefined;
  value: any | undefined;

  status: string = "";
  title: string = "";
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private cd: ChangeDetectorRef,
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.lists = [
      { name: "Masculino", id: 1 },
      { name: "Femenino", id: 2 },
    ]

    this.stateOptions = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 2 }
    ]

    this.value = 1
    console.log("entro: ", (this.config.data.element));


    if (this.config.data.type == "Estudiante") {
      this.estudiante = true;
      if (this.config.data.estatus == "add") {
        this.title = "Registrar Usuario";
        this.user = new FormGroup({
          identificacion: new FormControl("", Validators.required),
          correo: new FormControl("", Validators.required),
          nombre: new FormControl("", Validators.required),
          telefono: new FormControl("", Validators.required),
          fecha_nacimiento: new FormControl("", Validators.required),
          direccion: new FormControl("", Validators.required),
          estado: new FormControl("", Validators.required),
          genero: new FormControl("", Validators.required),
          semestre: new FormControl("", Validators.required),
          fecha_vinculacion: new FormControl("", Validators.required)
        });
        this.estudiante = true;
      } else if (this.config.data.estatus == "edit") {
        this.title = "Editar Usuario";

        this.selected = { name: this.config.data.element.usuario.genero.descripcion, id: this.config.data.element.usuario.genero.id }
        this.value = this.config.data.element.usuario.estado.id
        this.user = new FormGroup({
          identificacion: new FormControl({ value: this.config.data.element.usuario.identificacion, disabled: true }),
          correo: new FormControl({ value: this.config.data.element.usuario.correo, disabled: true }),
          nombre: new FormControl({ value: this.config.data.element.usuario.nombre, disabled: false }),
          telefono: new FormControl({ value: this.config.data.element.usuario.telefono, disabled: false }),
          fecha_nacimiento: new FormControl({ value: moment(this.config.data.element.usuario.fecha_vinculacion).format("YYYY-MM-DD"), disabled: false }),
          direccion: new FormControl({ value: this.config.data.element.usuario.direccion, disabled: false }),
          estado: new FormControl({ value: this.config.data.element.usuario.estado.id, disabled: false }),
          genero: new FormControl({ value: { name: this.config.data.element.usuario.genero.description, id: this.config.data.element.usuario.genero.id }, disabled: false }),
          semestre: new FormControl({ value: this.config.data.element.semestre, disabled: false }),
          fecha_vinculacion: new FormControl({ value: moment(this.config.data.element.usuario.fecha_vinculacion).format("YYYY-MM-DD"), disabled: false }),
        });
      } else {
        this.status = "view";
        this.title = "Ver Usuario";

        this.selected = { name: this.config.data.element.usuario.genero.description, id: this.config.data.element.usuario.genero.id }
        this.value = this.config.data.element.usuario.estado.id
        this.user = new FormGroup({
          identificacion: new FormControl({ value: this.config.data.element.usuario.identificacion, disabled: true }),
          correo: new FormControl({ value: this.config.data.element.usuario.correo, disabled: true }),
          nombre: new FormControl({ value: this.config.data.element.usuario.nombre, disabled: true }),
          telefono: new FormControl({ value: this.config.data.element.usuario.telefono, disabled: true }),
          fecha_nacimiento: new FormControl({ value: moment(this.config.data.element.usuario.fecha_nacimiento).format("YYYY-MM-DD"), disabled: true }),
          direccion: new FormControl({ value: this.config.data.element.usuario.direccion, disabled: true }),
          estado: new FormControl({ value: this.config.data.element.usuario.estado.id, disabled: true }),
          genero: new FormControl({ value: { name: this.config.data.element.usuario.genero.description, id: this.config.data.element.usuario.genero.id }, disabled: true }),
          semestre: new FormControl({ value: this.config.data.element.semestre, disabled: true }),
          fecha_vinculacion: new FormControl({ value: moment(this.config.data.element.usuario.fecha_vinculacion).format("YYYY-MM-DD"), disabled: true }),
        });
      }
    } else {
      this.estudiante = false;

      if (this.config.data.estatus == "add") {
        this.title = "Registrar Usuario";
        this.user = new FormGroup({
          identificacion: new FormControl("", [Validators.required]),
          correo: new FormControl("", [Validators.required]),
          nombre: new FormControl("", [Validators.required]),
          telefono: new FormControl("", [Validators.required]),
          fecha_nacimiento: new FormControl("", [Validators.required]),
          direccion: new FormControl("", [Validators.required]),
          estado: new FormControl("", [Validators.required]),
          genero: new FormControl("", [Validators.required]),
          fecha_vinculacion: new FormControl("", [Validators.required]),
          acuerdo_nombramiento: new FormControl("", [Validators.required]),
          archivo_nombramiento: new FormControl("", [Validators.required]),
        });
      } else if (this.config.data.estatus == "edit") {
        this.title = "Editar Usuario";
        this.selected = { name: this.config.data.element.usuario.genero.description, id: this.config.data.element.usuario.genero.id }
        this.value = this.config.data.element.usuario.estado.id
        this.user = new FormGroup({
          identificacion: new FormControl({ value: this.config.data.element.usuario.identificacion, disabled: true }),
          correo: new FormControl({ value: this.config.data.element.usuario.correo, disabled: true }),
          nombre: new FormControl({ value: this.config.data.element.usuario.nombre, disabled: false }),
          telefono: new FormControl({ value: this.config.data.element.usuario.telefono, disabled: false }),
          fecha_nacimiento: new FormControl({ value: moment(this.config.data.element.usuario.fecha_nacimiento).format("YYYY-MM-DD"), disabled: false }),
          direccion: new FormControl({ value: this.config.data.element.usuario.direccion, disabled: false }),
          genero: new FormControl({ value: { name: this.config.data.element.usuario.genero.description, id: this.config.data.element.usuario.genero.id }, disabled: false }),
          fecha_vinculacion: new FormControl({ value: moment(this.config.data.element.usuario.fecha_vinculacion).format("YYYY-MM-DD"), disabled: false }),
          acuerdo_nombramiento: new FormControl({ value: this.config.data.element.acuerdo_nombramiento, disabled: false }),
          archivo_nombramiento: new FormControl({ value: this.config.data.element.archivo_nombramiento, disabled: false }),
          estado: new FormControl({ value: this.config.data.element.usuario.estado.id, disabled: false }),
        });
      } else {
        this.status = "view"
        this.title = "Ver Usuario";
        this.selected = { name: this.config.data.element.usuario.genero.description, id: this.config.data.element.usuario.genero.id }
        this.value = this.config.data.element.usuario.estado.id
        this.user = new FormGroup({
          identificacion: new FormControl({ value: this.config.data.element.usuario.identificacion, disabled: true }),
          correo: new FormControl({ value: this.config.data.element.usuario.correo, disabled: true }),
          nombre: new FormControl({ value: this.config.data.element.usuario.nombre, disabled: true }),
          telefono: new FormControl({ value: this.config.data.element.usuario.telefono, disabled: true }),
          fecha_nacimiento: new FormControl({ value: moment(this.config.data.element.usuario.fecha_nacimiento).format("YYYY-MM-DD"), disabled: true }),
          direccion: new FormControl({ value: this.config.data.element.usuario.direccion, disabled: true }),
          genero: new FormControl({ value: { name: this.config.data.element.usuario.genero.description, id: this.config.data.element.usuario.genero.id }, disabled: true }),
          fecha_vinculacion: new FormControl({ value: moment(this.config.data.element.usuario.fecha_vinculacion).format("YYYY-MM-DD"), disabled: true }),
          acuerdo_nombramiento: new FormControl({ value: this.config.data.element.acuerdo_nombramiento, disabled: true }),
          archivo_nombramiento: new FormControl({ value: this.config.data.element.archivo_nombramiento, disabled: true }),
          estado: new FormControl({ value: this.config.data.element.usuario.estado.id, disabled: true }),
        });
      }

    }
  }

  cancel() {
    this.estudiante = false;
    this.ref.close({ mensaje: "cerrado", data: null });
  }

  save() {

    if (this.config.data.type == "Estudiante") {
      let data: any = {
        "semestre": this.user.value.semestre,
        "usuario": {
          "nombre": this.user.value.nombre,
          "identificacion": this.user.value.identificacion,
          "direccion": this.user.value.direccion,
          "correo": this.user.value.correo,
          "telefono": this.user.value.telefono,
          "fecha_nacimiento": this.user.value.fecha_nacimiento,
          "fecha_vinculacion": this.user.value.fecha_vinculacion,
          "genero_id": this.user.value.genero.id,
          "estado_usuario_id": this.user.value.estado ? 1 : 2,
          "tipo_usuario_id": 1
        },
      }
      if (this.config.data.estatus == "add") {
        this._userService.addUser(data).subscribe({
          next: (info: any) => {
            this.ref.close({ mensaje: "cerrado", data: null });
          },
          error: (error: HttpErrorResponse) => {
            console.log("error: ", error);

            this._messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          }
        })
      } else {
        data.id = this.config.data.element.id;
        data.usuario.id = this.config.data.element.usuario.id;
        this._userService.updateUser(data).subscribe({
          next: (info: any) => {
            this.ref.close({ mensaje: "cerrado", data: null });
          }
        })
      }


    } else {
      console.log("element: ", this.user.value);
      let data: any = {
        "acuerdo_nombramiento": this.user.value.acuerdo_nombramiento,
        "archivo_nombramiento": this.user.value.archivo_nombramiento,
        "usuario": {
          "nombre": this.user.value.nombre,
          "identificacion": this.user.value.identificacion,
          "direccion": this.user.value.direccion,
          "correo": this.user.value.correo,
          "telefono": this.user.value.telefono,
          "fecha_nacimiento": this.user.value.fecha_nacimiento,
          "fecha_vinculacion": this.user.value.fecha_vinculacion,
          "genero_id": this.user.value.genero.id,
          "estado_usuario_id": this.user.value.estado ? 1 : 2,
          "tipo_usuario_id": 2
        },
      }
      if (this.config.data.estatus == "add") {
        this._userService.addUserCoord(data).subscribe({
          next: (info: any) => {
            this.ref.close({ mensaje: "cerrado", data: null });
          }
        })
      } else {
        data.id = this.config.data.element.id;
        data.usuario.id = this.config.data.element.usuario.id;
        this._userService.updateUserCoord(data).subscribe({
          next: (info: any) => {
            this.ref.close({ mensaje: "cerrado", data: null });
          }
        })
      }
    }


  }
}
