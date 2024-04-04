import { Component, Input } from '@angular/core';
import { Announcement } from '../announcement';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-card-announcement',
  templateUrl: './card-announcement.component.html',
  styleUrls: ['./card-announcement.component.scss']
})
export class CardAnnouncementComponent {


  @Input() announcement: Announcement | undefined;
  urlApi = `${environment.apiURL}`; 
  urlUpload = `${this.urlApi.replace('/api', '')}/files/`; 
}
