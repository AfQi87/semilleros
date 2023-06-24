import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { event } from 'jquery';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SemilleroService } from 'src/app/services/semillero.service';

@Component({
  selector: 'app-semillero-gestion',
  templateUrl: './semillero-gestion.component.html',
  styleUrls: ['./semillero-gestion.component.scss']
})
export class SemilleroGestionComponent implements OnInit {
  public user: FormGroup = new FormGroup({});
  title: string = "Registro Semilleros";
  status: string = "";
  img: string = "";
  aResolucion: any;
  stateOptions: any[] | undefined;
  value: any | undefined;

  lists: any[] | undefined;
  selected: any | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _semilleroService: SemilleroService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.stateOptions = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 2 }
    ]
    this.value = 1

    this._semilleroService.getListLinea().subscribe({
      next: (res) => {
        let aux = res.map((item: any) => {
          return {
            name: item.descripcion,
            code: item.id
          }
        })
        this.lists = [...aux]
      },
      error: (err) => { console.error(err) }
    })

    if (this.config.data.status == "add") {
      this.user = new FormGroup({
        nombre: new FormControl("", Validators.required),
        correo: new FormControl("", Validators.required),
        fecha_resolucion: new FormControl("", Validators.required),
        numero: new FormControl("", Validators.required),
        archivo_resolucion: new FormControl("", Validators.required),
        logo: new FormControl("", Validators.required),
        descripcion: new FormControl("", Validators.required),
        estado: new FormControl("", Validators.required),
        linea: new FormControl("", Validators.required),
      });
    } else if (this.config.data.status == "edit") {
      this.title = "Editar Semillero"
      this.img = this.config.data.element.logo;
      this.aResolucion = this.config.data.element.archivo_resolucion;
      let aux = this.config.data.element.linea.map((item: any) => {
        return {
          name: item.lineaInvestigacion.descripcion,
          code: item.lineaInvestigacion.id
        }
      })
      this.selected = [...aux]
      this.user = new FormGroup({
        nombre: new FormControl({ value: this.config.data.element.nombre, disabled: true }),
        correo: new FormControl({ value: this.config.data.element.correo, disabled: true }),
        fecha_resolucion: new FormControl({ value: this.config.data.element.fecha_resolucion, disabled: false }),
        numero: new FormControl({ value: this.config.data.element.numero_resolucion, disabled: false }),
        archivo_resolucion: new FormControl({ value: this.config.data.element.archivo_resolucion, disabled: false }),
        logo: new FormControl({ value: this.config.data.element.logo, disabled: false }),
        descripcion: new FormControl({ value: this.config.data.element.descripcion, disabled: false }),
        estado: new FormControl({ value: this.config.data.element.estado_id, disabled: false }),
        linea: new FormControl({ value: this.config.data.element.estado_id, disabled: false }),

      });
    } else {
      this.status = "view"
      this.title = "Ver Semillero"
      this.img = this.config.data.element.logo;
      this.aResolucion = this.config.data.element.archivo_resolucion;

      this.user = new FormGroup({
        nombre: new FormControl({ value: this.config.data.element.nombre, disabled: true }),
        correo: new FormControl({ value: this.config.data.element.correo, disabled: true }),
        fecha_resolucion: new FormControl({ value: this.config.data.element.fecha_resolucion, disabled: true }),
        numero: new FormControl({ value: this.config.data.element.numero_resolucion, disabled: true }),
        archivo_resolucion: new FormControl({ value: this.config.data.element.archivo_resolucion, disabled: true }),
        logo: new FormControl({ value: this.config.data.element.logo, disabled: true }),
        descripcion: new FormControl({ value: this.config.data.element.descripcion, disabled: true }),
        estado: new FormControl({ value: this.config.data.element.estado_id, disabled: true }),
        linea: new FormControl({ value: this.config.data.element.estado_id, disabled: true }),
      });
    }

  }

  onChange(e: any) {
    console.log("entro: ", e);
    this.img = e[0].base64
  }

  onChangeR(e: any) {
    console.log("entro: ", e);
    this.aResolucion = e[0].base64
  }


  save() {

    console.log(this.user.value);

    let data: any = {
      "correo": this.user.value.correo,
      "nombre": this.user.value.nombre,
      "logo": this.img,
      "descripcion": this.user.value.descripcion,
      "fecha_resolucion": this.user.value.fecha_resolucion,
      "numero_resolucion": this.user.value.numero,
      "archivo_resolucion": this.aResolucion,
      "coordinador_id": null,
      "estado_id": this.user.value.estado,
      "lineas": this.user.value.linea
    }
    if (this.config.data.status == "add") {
      this._semilleroService.addData(data).subscribe({
        next: (info: any) => {
          this.ref.close({ mensaje: "cerrado", data: null });
        },
        error: (error: HttpErrorResponse) => {
          console.log("error: ", error);
          this._messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      })
    } else {
      data.id = this.config.data.element.id
      this._semilleroService.updateData(data).subscribe({
        next: (info: any) => {
          this.ref.close({ mensaje: "cerrado", data: null });
        },
        error: (error: HttpErrorResponse) => {
          console.log("error: ", error);
          this._messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      })
    }
  }

  cancel() {
    this.ref.close({ mensaje: "cerrado", data: null });
  }
}
