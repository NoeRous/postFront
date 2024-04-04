import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PublicationService } from '../publication.service';
import { Publication } from '../publication';

@Component({
  selector: 'app-card-publication',
  templateUrl: './card-publication.component.html',
  styleUrls: ['./card-publication.component.scss']
})
export class CardPublicationComponent {

  urlApi = `${environment.apiURL}`; 
  urlUpload = `${this.urlApi.replace('/api', '')}/files/`; 
  hide = true;

  publications: Publication[] = [];

  constructor(
    private publicationService:PublicationService
    ) { }

  ngOnInit(): void {
    this.getPublicationsActives()
  }
 
 
  getPublicationsActives(): void {
    this.publicationService.getPublicationsActives().subscribe(publications => {
      this.publications = publications;
    });
  }
}
