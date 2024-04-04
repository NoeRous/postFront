import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostulationService } from '../postulation.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { Person } from '../../page-person/person';
import { PersonService } from '../../page-person/person.service';
import { PostulationModel } from '../Postulation';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-page-show-details-postulation',
  templateUrl: './page-show-details-postulation.component.html',
  styleUrls: ['./page-show-details-postulation.component.scss']
})
export class PageShowDetailsPostulationComponent {

  urlApi = `${environment.apiURL}`;
  urlUpload = `${this.urlApi.replace('/api', '')}/files/`;
  urlUploadProyect = `${this.urlApi.replace('/api', '')}/files-proyects/`;

  postulationId: any | undefined;
  postulation:PostulationModel  | undefined;
  person: Person | undefined;
  username:string | undefined;

  file_proyect_description:string  | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postulationService: PostulationService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.getPerson();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postulationId = params.get('id');
    })
    this.getPostulation();
  }

  getPostulation(): void {
    this.postulationService.getPostulation(this.postulationId)
      .subscribe(resp =>{
        this.postulation = resp
        this.getFileProyectDescription();
      });
  }

  

  getPerson(): void {
    this.personService.getPersonProfile()
      .subscribe(resp =>{
        this.person = resp.person
        this.username = resp.username
      });
  }

  onFileInput(event:any){
    if (event.length) {
      const file = event[0];

      var formData = new FormData();
      formData.append('file', file);

      this.postulationService.uploadImage(formData).subscribe((data) => {
       
        console.log("data.filename ", data.filename);
        

      });

      //  this.display.patchValue(`${f.name}${count}`);
    } else {
      // this.display.patchValue("");
    }

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
