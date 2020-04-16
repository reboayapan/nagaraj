import { Detail } from './../../../../common/models/detail.model';
import { ApiService } from './../../../../common/services/api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss']
})
export class EditDetailComponent implements OnInit {
  jsonData: any;
  basicProfileDetail: FormGroup;
  _detailModel: Detail = new Detail();
  // employee.number = "test";
  welcomeMessage:any = 'Welcome to Angular Data Binding Example!!';
  constructor(
    private apiService: ApiService,
    private _changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder) { }
  ngOnInit() {
    this.basicProfileDetail = this.fb.group({
      number: new FormControl(),
      first_name: new FormControl(),
      last_name: new FormControl(),
      email: new FormControl(),
      aboutMe: new FormControl(),
      country: new FormControl(),
      state: new FormControl(),
      district: new FormControl(),
      income: new FormControl(),
      weight: new FormControl(),
      height: new FormControl(),
      bodyType: new FormControl(),
      complexion: new FormControl(),
      eatingHabit: new FormControl(),
      drinkingHabit: new FormControl(),
      smokingHabit: new FormControl(),
      education: new FormControl(),
      privateSector: new FormControl(),
      governmentSector: new FormControl(),
      business: new FormControl(),
      working_field: new FormControl(),
      designation: new FormControl(),
      about_family: new FormControl(),
      father_status: new FormControl(),
      mother_status: new FormControl(),
      sister: new FormControl(),
      sister_married: new FormControl(),
      brother_married: new FormControl(),
      brother: new FormControl(),
      family_value: new FormControl(),
      family_type: new FormControl(),
      religion: new FormControl(),
      caste: new FormControl(),
      raasi: new FormControl(),
      star: new FormControl(),
      gothram: new FormControl(),
      dosham: new FormControl(),
      birth_country: new FormControl(),
      birth_state: new FormControl(),
      birth_district: new FormControl(),
      age: new FormControl(),
      mother_tongue: new FormControl(),
      profile_created_for:new FormControl(),
      physical_status:new FormControl(),
      marital_status: new FormControl(),
      children: new FormControl(),
      occupation_type: new FormControl(),
      birth_hour: new FormControl(),
      birth_mins: new FormControl(),
      birth_am_pm:new FormControl()
     
    });
    this.getByGrromById();
  }
  getByGrromById(){
    this.apiService.getGroomDetail(82).subscribe(
      res => {
        // console.error("success!!" + res);
        this._detailModel=res; 
        console.error(this._detailModel);
        console.error(this._detailModel.number);
        console.error(this._detailModel.birth_district);
        console.log(JSON.stringify(res));
        this._changeDetectorRef.detectChanges();
      },
      error => {
        console.log(error);
      }
    );
  }
}
