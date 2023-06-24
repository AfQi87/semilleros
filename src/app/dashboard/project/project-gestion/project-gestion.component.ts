import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectService } from 'src/app/services/project.service';
import { SemilleroService } from 'src/app/services/semillero.service';


@Component({
  selector: 'app-project-gestion',
  templateUrl: './project-gestion.component.html',
  styleUrls: ['./project-gestion.component.scss']
})
export class ProjectGestionComponent implements OnInit {

  public user: FormGroup = new FormGroup({});
  title: string = "Registrar Proyecto";
  status: string = "";

  stateOptions: any[] | undefined;
  value: any | undefined;


  lists: any[] | undefined;
  selected: any | undefined;


  listsS: any[] | undefined;
  selectedS: any | undefined;

  aPropuesta: any;
  aFinal: string = "";

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _projectService: ProjectService,
    private _semilleroService: SemilleroService,
    private _messageService: MessageService,
    public domSanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.stateOptions = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 2 }
    ]
    this.value = 1
    this._projectService.getLstType().subscribe({
      next: (res) => {
        let aux = res.map((item: any) => {
          return {
            name: item.descripcion,
            id: item.id
          }
        })
        this.lists = [...aux]
      },
      error: (err) => { console.error(err) }
    });

    this._semilleroService.getLst().subscribe({
      next: (res) => {
        let aux = res.map((item: any) => {
          return {
            name: item.nombre,
            id: item.id
          }
        })
        this.listsS = [...aux]
      },
      error: (err) => { console.error(err) }
    });

    if (this.config.data.status == "add") {
      this.user = new FormGroup({
        codigo: new FormControl("", Validators.required),
        titulo: new FormControl("", Validators.required),
        fecha_inicio: new FormControl("", Validators.required),
        fecha_fin: new FormControl("", Validators.required),
        archivo_propuesta: new FormControl("", Validators.required),
        archivo_proyecto_final: new FormControl("", Validators.required),
        estado: new FormControl("", Validators.required),
        tipo: new FormControl("", Validators.required),
        semillero: new FormControl("", Validators.required),
      });
    } else if (this.config.data.status == "edit") {
      this.title = "Editar Proyecto";
      
      this.selectedS = { name: this.config.data.element.semillero.nombre, id: this.config.data.element.semillero.id }
      this.selected = { name: this.config.data.element.tipo.descripcion, id: this.config.data.element.tipo.id }
      this.value = this.config.data.element.estado.id;

      this.aPropuesta = (this.config.data.element.archivo_propuesta);
      this.aFinal = this.config.data.element.archivo_proyecto_final;

      this.user = new FormGroup({
        codigo: new FormControl({ value: this.config.data.element.codigo, disabled: true }),
        titulo: new FormControl({ value: this.config.data.element.titulo, disabled: true }),
        fecha_inicio: new FormControl({ value: this.config.data.element.fecha_inicio, disabled: false }),
        fecha_fin: new FormControl({ value: this.config.data.element.fecha_fin, disabled: false }),
        archivo_propuesta: new FormControl({ value: this.config.data.element.archivo_propuesta, disabled: false }),
        archivo_proyecto_final: new FormControl({ value: this.config.data.element.archivo_proyecto_final, disabled: false }),
        estado: new FormControl({ value: this.config.data.element.estado_proyecto_id, disabled: false }),
        tipo: new FormControl({ value: { name: this.config.data.element.tipo.descripcion, id: this.config.data.element.tipo.id }, disabled: false }),
        semillero: new FormControl({ value: { name: this.config.data.element.semillero.nombre, id: this.config.data.element.semillero.id }, disabled: false }),
      });
    } else {
      this.title = "Ver Proyecto";
      this.status = "view";
      this.selectedS = { name: this.config.data.element.semillero.nombre, id: this.config.data.element.semillero.id };
      this.selected = { name: this.config.data.element.tipo.descripcion, id: this.config.data.element.tipo.id };
      this.aPropuesta = this.config.data.element.archivo_propuesta;
      this.aFinal = this.config.data.element.archivo_proyecto_final;
      this.user = new FormGroup({
        codigo: new FormControl({ value: this.config.data.element.codigo, disabled: true }),
        titulo: new FormControl({ value: this.config.data.element.titulo, disabled: true }),
        fecha_inicio: new FormControl({ value: this.config.data.element.fecha_inicio, disabled: true }),
        fecha_fin: new FormControl({ value: this.config.data.element.fecha_fin, disabled: true }),
        archivo_propuesta: new FormControl({ value: this.config.data.element.archivo_propuesta, disabled: true }),
        archivo_proyecto_final: new FormControl({ value: this.config.data.element.archivo_proyecto_final, disabled: true }),
        estado: new FormControl({ value: this.config.data.element.estado_proyecto_id, disabled: true }),
        tipo: new FormControl({ value: { name: this.config.data.element.tipo.descripcion, id: this.config.data.element.tipo.id }, disabled: true }),
        semillero: new FormControl({ value: { name: this.config.data.element.semillero.nombre, id: this.config.data.element.semillero.id }, disabled: true }),
      });
    }

  }

  onChangeAP(e: any) {
    console.log("entro: ", e);
    this.aPropuesta = e[0].base64
  }
  onChangeAF(e: any) {
    this.aFinal = e[0].base64
  }

  save() {
    let data: any = {
      "codigo": this.user.value.codigo,
      "titulo": this.user.value.titulo,
      "fecha_inicio": this.user.value.fecha_inicio,
      "fecha_fin": this.user.value.fecha_fin,
      "archivo_propuesta": this.aPropuesta,
      "archivo_proyecto_final": this.aFinal,
      "estado_proyecto_id": this.user.value.estado,
      "tipo_proyecto_id": this.user.value.tipo.id,
      "semillero_id": this.user.value.semillero.id,
    }
    if (this.config.data.status == "add") {
      this._projectService.addData(data).subscribe({
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
      this._projectService.updateData(data).subscribe({
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
