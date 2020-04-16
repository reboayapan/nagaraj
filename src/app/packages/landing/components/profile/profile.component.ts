import { Detail } from './../../../../common/models/detail.model';
import { ApiService } from './../../../../common/services/api.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isImageLoading = true;
  imageToShow :any;
  fileToUpload: File = null;
  _detailModel: Detail = new Detail();
  previewUrl:any = null;
  


  width:any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private sanitizer: DomSanitizer,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.width =25;
   this. getByGrromById()
  }

  getByGrromById(){
    this.isImageLoading = true;
    this.apiService.getGroomDetail(9172).subscribe(
      res => {
        this._detailModel=res
        // console.error("success!!" + res);
        // console.error("success!!" + this._detailModel.photo);

        let objectURL = 'data:image/*;base64,' + this._detailModel.photo;
        this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.isImageLoading = false;
        this._changeDetectorRef.detectChanges();
      },
      error => {
        this.isImageLoading = false;
      });
  }

}
