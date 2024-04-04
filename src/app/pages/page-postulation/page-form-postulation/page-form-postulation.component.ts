import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { PostulationService } from '../postulation.service';
import { MessageService } from 'src/app/message.service';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { Institution, Position, PositionType } from '../Postulation';
import { Announcement } from '../../page-announcement/announcement';
import { AnnouncementService } from '../../page-announcement/announcement.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-page-form-postulation',
  templateUrl: './page-form-postulation.component.html',
  styleUrls: ['./page-form-postulation.component.scss']
})
export class PageFormPostulationComponent {

  id: any | undefined;
  institutions: Institution[] = [];
  positionsType: PositionType[] = [];
  positions: Position[] = [];
  announcementCurrent: Announcement | undefined;
  announcentId: any | undefined;
  institutionId: any | undefined;


  postulacionForm = this.fb.group({
    position_id: ['', Validators.required],
    institution_id: ['', Validators.required],
    position_type_id: ['', Validators.required],
    announcement_id: ['', Validators.required],
    voucher_url: [''],
    voucher: ['', [ Validators.pattern('^[0-9]*$')]],
    is_payroll: [true, Validators.required],
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private postulationService: PostulationService,
    private announcementService: AnnouncementService,
    private messageService: MessageService) {
      this.postulacionForm.get('is_payroll')?.valueChanges.subscribe(isPayroll => {
        if (!isPayroll) {
          this.postulacionForm.get('voucher')?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
          this.postulacionForm.get('voucher_url')?.setValidators([Validators.required]);
        } else {
          this.postulacionForm.get('voucher')?.clearValidators();
          this.postulacionForm.get('voucher_url')?.clearValidators();
        }
  
        // Actualizar las validaciones
        this.postulacionForm.get('voucher')?.updateValueAndValidity();
        this.postulacionForm.get('voucher_url')?.updateValueAndValidity();
      });
     }



  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.getAnnouncementCurrent();

  }

  onSubmit() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { title: "Confirmar", message: `¿Está seguro de realizar su postulación?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.postulationService.postulation(this.postulacionForm.value).subscribe(
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

      this.postulationService.uploadImage(formData).subscribe((data) => {
        this.postulacionForm.controls['voucher_url'].setValue(data.filename);
      });

      //  this.display.patchValue(`${f.name}${count}`);
    } else {
      // this.display.patchValue("");
    }
  }

  getInstitutions(announcentId: number): void {
    this.postulationService.getInstitutions(announcentId)
      .subscribe(institutions => (this.institutions = institutions));
  }

  getPositionsType(): void {
    this.postulationService.getPositionsType()
      .subscribe(positionsType => (this.positionsType = positionsType));
  }

  getPositions(tipoCargoId: number): void {
    this.postulationService.getPositions(this.announcentId, this.institutionId, tipoCargoId)
      .subscribe(positions => (this.positions = positions));
  }

  doSomethingPosition(item: any) {
    this.getPositions(item.value)
    this.postulacionForm.get('position_id')?.reset();
  }

  doSomethingTypePosition(item: any) {
    this.institutionId = item.value
    this.postulacionForm.get('position_type_id')?.reset();
    this.postulacionForm.get('position_id')?.reset();
    this.getPositionsType()
  }
  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent().subscribe(announcement => {
      this.announcementCurrent = announcement;
      this.announcentId = announcement.id
      this.postulacionForm.get('announcement_id')?.setValue(this.announcentId);
      this.getInstitutions(this.announcentId)
    });
  }

  get isPayroll(): FormControl {    
    return this.postulacionForm.get('is_payroll') as FormControl;
  }

}
