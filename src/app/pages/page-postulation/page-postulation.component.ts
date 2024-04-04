import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { PostulationService } from './postulation.service';
import { Phase, Postulation } from './Postulation';
import { environment } from 'src/environments/environment.development';
import { AnnouncementService } from '../page-announcement/announcement.service';
import { Announcement } from '../page-announcement/announcement';
import { of, switchMap } from 'rxjs';
import { Table } from 'primeng/table';
import { PhaseAction } from '../page-phase-action/phase-action';
import { PhaseActionService } from '../page-phase-action/phase-action.service';
@Component({
  selector: 'app-page-postulation',
  templateUrl: './page-postulation.component.html',
  styleUrls: ['./page-postulation.component.scss']
})
export class PagePostulationComponent {

  urlApi = `${environment.apiURL}`;
  urlUpload = `${this.urlApi.replace('/api', '')}/files/`;
  urlUploadProyect = `${this.urlApi.replace('/api', '')}/files-proyects/`;

  postulationId: any | undefined;
  postulations: Postulation[] = [];
  announcementCurrent: Announcement | undefined;
  phases: Phase[] = [];
  announcementId: any | undefined;

  phaseActions: PhaseAction[] = [];

  phaseActionsPostulation: PhaseAction[] = [];

  loading: boolean = true;

  isRegisterActionExists = false;

  constructor(
    private postulationService: PostulationService,
    private announcementService: AnnouncementService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
    private phaseActionService: PhaseActionService
  ) { }

  ngOnInit(): void {
    this.getPostulations();
    this.getAnnouncementCurrent();
  }

  clear(table: Table) {
    table.clear();
  }

  getPostulations(): void {
    this.postulationService.getPostulations().subscribe(
      (postulations) => {
        this.postulations = postulations;
        this.loading = false; // Se detiene la carga después de recibir los datos exitosamente
      },
      (error) => {
        console.error('Error al obtener las postulaciones:', error);
        this.loading = false; // Importante establecer a falso en caso de error también
      }
    );
  }


  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent()
      .subscribe(announcement => (
        this.announcementCurrent = announcement,
        this.announcementId = announcement.id,
        this.getPhaseActions(this.announcementId)
      ));
  }

  getPhaseActions(id: number): void {
    this.phaseActionService.getPhaseActions(id)
      .subscribe(phaseActions => {
        this.phaseActions = phaseActions;
        this.checkRegisterAction(this.phaseActions);
        //this.isRegisterActionExists = this.phaseActions.some(item => item.action === 'register-postulation');
      });
  }

  getPhaseActionsPostulation(id: number): void {
    this.phaseActionService.getPhaseActionsByPostulation(id)
      .subscribe(phaseActions => (
        this.phaseActionsPostulation = phaseActions

      ));
  }

  postulationDetails(postulation: Postulation) {
    this.router.navigate(['/admin/postulation/details/', postulation.id]);
  }

  postulationTest(postulation: Postulation) {
    this.router.navigate(['/admin/postulation-test/', postulation.id]);
  }

  btnVerifyPhasePostulation(postulation: Postulation, phase: Phase) {

    this.postulationService.getVerifyPostulationPhase(postulation, phase).pipe(
      switchMap((res) => {

        if (phase.id == 1 && res === true) {
          this.postulationDetails(postulation);
        }

        if (phase.id == 2 && res === true) {
          this.postulationTest(postulation);
        }
        return of(null);
      })
    ).subscribe(() => {
      // Aquí puedes realizar acciones adicionales después de completar el flujo
    });
  }

  btnType(postulation: Postulation, type: string) {

    if (type == 'register-merits') {
      this.postulationDetails(postulation);
    }
    if (type == 'discuss-merits') {
      this.postulationDetails(postulation);
    }
  }

  getPhases(): void {
    if (this.announcementCurrent) {
      this.postulationService.getPhases(this.announcementCurrent)
        .subscribe(phases => (this.phases = phases));
    } else {
      console.log('entro aqui')
    }
  }
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info'; // Otra opción por defecto
    }
  }

  checkRegisterAction(phaseActions: PhaseAction[]) {
    this.isRegisterActionExists = phaseActions.some(item => item.action === 'register-postulation');
  }

  checkActionsPostulation(phaseActions: PhaseAction[]) {
    this.isRegisterActionExists = phaseActions.some(item => item.action === 'register-postulation');
  }

  btnEdit(postulation: Postulation) {
    this.router.navigate(['/admin/postulation/edit', postulation.id]);
  }
}
