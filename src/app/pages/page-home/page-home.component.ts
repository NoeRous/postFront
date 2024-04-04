import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Announcement } from '../page-announcement/announcement';
import { AnnouncementService } from '../page-announcement/announcement.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;

  urlApi = `${environment.apiURL}`; 
  urlUpload = `${this.urlApi.replace('/api', '')}/files/`; 
  hide = true;

  announcementCurrent: Announcement | undefined;

  constructor(
    private announcementService:AnnouncementService
   
    ) { }

  ngOnInit(): void {
    this.getAnnouncementCurrent()
  }
 
 
  getAnnouncementCurrent(): void {
    this.announcementService.getAnnouncementCurrent().subscribe(announcement => {
      this.announcementCurrent = announcement;
      // this.announcentId = announcement.id
      // this.postulacionForm.get('announcement_id')?.setValue(this.announcentId);
      // this.getInstitutions(this.announcentId)
    });
  }
}
