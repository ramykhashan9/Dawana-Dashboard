import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { PharmaciesService } from 'src/app/shared/services/pharmacies.service';

@Component({
  selector: 'app-upload-dispensing',
  templateUrl: './upload-dispensing.component.html',
  styleUrls: ['./upload-dispensing.component.scss']
})
export class UploadDispensingComponent implements OnInit, OnDestroy {
  suscriptions: Subscription = new Subscription();
  uploadGroup: FormGroup;

  pharmacyId: number;
  constructor(
    private sanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService,
    private messageService: MessageService,
    private pharmaciesService: PharmaciesService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.pharmacyId = config.data.pharmacyId;
  }
  ngOnInit(): void {
    this.uploadGroup = new FormGroup({
      "document_expiry": new FormControl(null, Validators.required)
    });
  }
  acceptedTypes = ['image/*', 'application/pdf',
    // 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  uploadedFile: any;
  public fileData: any = null;
  uploadFile(event: any) {
    // const maxFileSize = 300 * 1024;
    const maxFileSize = 4 * 1024 * 1024;
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file == null || file == undefined) {
      return;
    }
    if (file.size > maxFileSize) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed', detail: 'The total size of selected files exceeds 4 MB. Please select smaller files.' });
      return; // Exit the method
    }

    if (file.type.startsWith('image/')) {
      console.log("File");
      reader.onloadend = (event: any) => {
        let image = event.target.result;
        this.imageCompress
          .compressFile(image, 0, 50, 50)
          .then(
            (compressedImage) => {
              compressedImage = compressedImage.split(',')[1];
              const byteArray = Uint8Array.from(
                atob(compressedImage)
                  .split('')
                  .map(char => char.charCodeAt(0))
              );
              const imagefile = new Blob([byteArray], { type: 'image/*' });
              this.uploadedFile = {
                "name": file.name,
                "type": file.type,
                "url": this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(imagefile))
              };
              this.fileData = compressedImage;
              console.log(this.uploadedFile);
            }
          );

      };
      reader.onerror = () => {
        console.log('Error reading large image.');
      };
      reader.readAsDataURL(file);

    } else {
      reader.onloadend = (event: any) => {
        this.fileData = event.target.result.split(',')[1];
      };
      reader.onerror = () => {
        console.log('Error reading large image.');
      };
      reader.readAsDataURL(file);
      this.uploadedFile = {
        "name": file.name,
        "type": file.type,
        "url": this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file))
      };
      console.log(file);
    }
  }

  removeFile() {
    this.uploadedFile = null;
    this.fileData = null;
  }
  isSubmitted: boolean = false;
  uploadDoc() {
    if (this.uploadGroup.invalid) {
      return;
    }
    if (this.fileData == null) {
      this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed', detail: 'Please Select File.' });
      return;
    }
    this.isSubmitted = true;
    console.log(this.pharmacyId);
    console.log(this.uploadGroup.value.document_expiry);
    console.log(this.fileData);
    let docSub = this.pharmaciesService.uploadDispenseLetter(
      this.pharmacyId,
      this.fileData,
      this.uploadGroup.value.document_expiry
    ).subscribe(
      (resonse) => {
        if (resonse && resonse['status']) {
          this.removeFile();
          this.ref.close(resonse);
        }
        this.isSubmitted = false;
      },
      (error) => {
        console.log(error);
        this.isSubmitted = false;
        this.ref.close(error);
      }
    );
    this.suscriptions.add(docSub);
  }
  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }
}
