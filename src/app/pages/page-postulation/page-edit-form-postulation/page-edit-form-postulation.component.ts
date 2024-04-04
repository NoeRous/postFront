import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { PostulationService } from '../postulation.service';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';

import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Postulation, PostulationModel } from '../Postulation';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-page-edit-form-postulation',
  templateUrl: './page-edit-form-postulation.component.html',
  styleUrls: ['./page-edit-form-postulation.component.scss']
})
export class PageEditFormPostulationComponent {

  

  id: any | undefined;

  postulation: PostulationModel | undefined;

  file_proyect_description:string  | undefined;


  postulationForm = this.fb.group({
    file_proyect_url: ['', Validators.required],
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private postulationService: PostulationService,
    private messageService: MessageService) {

     }



  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getPostulation()
    });
    this.getFileProyectDescription();
    
  }

  // onSubmit() {
  //   var sendData = this.postulationForm.value ;
  //   if (this.id) {
  //     this.postulationService
  //       .updatePostulation(this.id,sendData)
  //       .subscribe(postulation => {
  //         this.router.navigate(['/admin/postulation']);
  //         this.messageService.openSnackBar("Registro realizado");
  //       });
  //   }
  // }

  onSubmit() {
    var sendData = this.postulationForm.value ;
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { title: "Confirmar", message: `¿Está seguro de realizar el registro?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.postulationService
        .updatePostulation(this.id,sendData)
        .subscribe(
          resp => {
            if(resp.id){
              this.router.navigate(['/admin/postulation']);
              this.messageService.openSnackBar("Registrado correctamente");
            }
          },
          (error: HttpErrorResponse) => {
            if (error.error instanceof ErrorEvent) {
              // Error del lado del cliente
              this.messageService.openSnackBar('Error en el cliente. Intente nuevamente más tarde.');
            } else {
              // Error del servidor, puedes mostrar el mensaje de error devuelto por el backend
              this.messageService.openSnackBar(`Error del servidor: ${error.error.message}`);
            }
          }
        );
      }
    });
  }

  handleFileInputChange(l: any): void {
    //this.file_store = l;
    if (l.length) {
      const file = l[0];

      var formData = new FormData();
      formData.append('file', file);

      this.postulationService.uploadProyect(formData).subscribe((data) => {
        this.postulationForm.controls['file_proyect_url'].setValue(data.filename);
      });

      //  this.display.patchValue(`${f.name}${count}`);
    } else {
      // this.display.patchValue("");
    }
  }

  getPostulation(): void {
    this.postulationService.getPostulation(this.id)
      .subscribe(resp =>{
        this.postulation = resp
        this.getFileProyectDescription()
        this.postulationForm.patchValue(resp);
      });
  }

  getFileProyectDescription(): void {
    const positionType = this.postulation?.announcementInstitutionPosition?.institutionPosition?.position?.t_par_position_type?.name;
    console.log('positionType',positionType)
    if (positionType === 'ADMINISTRATIVO') {
      this.file_proyect_description = 'proyecto-adm';
    } else if (positionType === 'DOCENTE') {
      this.file_proyect_description = 'PROPUESTA TRANSFORMADORA INSTITUCIONAL';

    }else if (positionType === 'DIRECTIVO') {
      this.file_proyect_description = 'PROYECTO DE GÉSTION INSTITUCIONAL'
    } else {
      this.file_proyect_description = 'PROYECTO';
    }
  }
}
