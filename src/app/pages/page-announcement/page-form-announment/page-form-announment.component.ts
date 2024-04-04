import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../announcement';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-page-form-announment',
  templateUrl: './page-form-announment.component.html',
  styleUrls: ['./page-form-announment.component.scss']
})
export class PageFormAnnounmentComponent {


  id: any | undefined;

  announcements: Announcement[] | undefined

  announcementForm = this.fb.group({
    name: ['', Validators.required],
    description: ['',Validators.required],
    date_init: ['',Validators.required],
    date_end: ['',Validators.required],
    cite: ['',Validators.required],
    file_url: [''],
    image_url: [''],
    year:['',Validators.required],
    publication_date: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.announcementService.getAnnouncement(this.id)
          .subscribe(announcement => {
            this.announcementForm.patchValue(announcement);
          });
      }

    });

  }

  onSubmit() {
    var sendData = this.announcementForm.value ;
    if (this.id) {
      this.announcementService
        .updateAnnouncement(this.id,sendData)
        .subscribe(announcement => {
          this.router.navigate(['/admin/announcement']);
          this.messageService.openSnackBar("Registro Editado");
        });
    } else {
      this.announcementService
        .addAnnouncement(sendData)
        .subscribe(announcement => {
          this.router.navigate(['/admin/announcement']);
          this.messageService.openSnackBar("Nuevo Registro");
        });
    }


  }


  getAnnouncements(): void {
    this.announcementService.getAnnouncements()
      .subscribe(announcements => (this.announcements = announcements));
  }

  handleFileInputChange(l: any): void {
    //this.file_store = l;
    if (l.length) {
      const file = l[0];

      var formData = new FormData();
      formData.append('file', file);

      this.announcementService.uploadImage(formData).subscribe((data) => {
        this.announcementForm.controls['file_url'].setValue(data.filename);
      });

      //  this.display.patchValue(`${f.name}${count}`);
    } else {
      // this.display.patchValue("");
    }
  }

  handleImageInputChange(l: any): void {
    //this.file_store = l;
    if (l.length) {
      const file = l[0];

      var formData = new FormData();
      formData.append('file', file);

      this.announcementService.uploadImage(formData).subscribe((data) => {
        this.announcementForm.controls['image_url'].setValue(data.filename);
      });

      //  this.display.patchValue(`${f.name}${count}`);
    } else {
      // this.display.patchValue("");
    }
  }


}
