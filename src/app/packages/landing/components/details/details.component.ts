import { ApiService } from "./../../../../common/services/api.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  // @ViewChild('basicProfileDetail') public createEmployeeForm: NgForm;
  _isChildrenInputOpen: boolean = false;
  _isBusinessSelected: boolean = false;

  _basicProfileDetail: FormGroup;
  _FamilyReligionDetail: FormGroup;
  _PartnerPreferenceDetail: FormGroup;
  tab1 = true;
  tab2: boolean;
  tab3: boolean;
  tab4: boolean;
  number_detail: any;
  ismaritals: boolean = false;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  public _userPhoto: any = File;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getDetails();

    this._basicProfileDetail = this.fb.group({
      currentCountry: new FormControl(),
      currentState: new FormControl(),
      currentDistrict: new FormControl(),
      education: new FormControl(),
      business: new FormControl(),
      workingField: new FormControl(),
      designation: new FormControl(),
      income: new FormControl(),
      weight: new FormControl(),
      height: new FormControl(),
      bodyType: new FormControl(),
      complexion: new FormControl(),
      eatingHabit: new FormControl(),
      drinkingHabit: new FormControl(),
      smokingHabit: new FormControl(),
      dosham: new FormControl(),
      religion: new FormControl(),
      caste: new FormControl(),
      raasi: new FormControl(),
      star: new FormControl(),
      gothram: new FormControl(),
      birthCountry: new FormControl(),
      birthState: new FormControl(),
      birthDistrict: new FormControl(),
      aboutFamily: new FormControl(),
      fatherStatus: new FormControl(),
      motherStatus: new FormControl(),
      sisters: new FormControl(),
      marriedSisters: new FormControl(),
      marriedBrothers: new FormControl(),
      brothers: new FormControl(),
      familyValue: new FormControl(),
      familyType: new FormControl(),
      age: new FormControl(),
      motherTongue: new FormControl(),
      maritalStatus: new FormControl(),
      children: new FormControl(),
      physicalStatus: new FormControl(),
      occupationType: new FormControl(),
      birth_hour: new FormControl(),
      birth_mins: new FormControl(),
      birth_am_pm: new FormControl(),
      birthTime: new FormControl(),
      number: [this.number_detail, Validators.required]
    });

    this._PartnerPreferenceDetail = new FormGroup({
      age_to: new FormControl(),
      age_from: new FormControl(),
      income_start_range: new FormControl(),
      income_end_range: new FormControl(),
      height_from: new FormControl(),
      height_to: new FormControl(),
      district: new FormControl(),
      p_birth_time: new FormControl(),
      dosham: new FormControl(),
      p_country: new FormControl(),
      p_state: new FormControl(),
      p_district: new FormControl(),
      about_partner: new FormControl(),
      p_family_value: new FormControl(),
      p_family_type: new FormControl(),
      p_family_statue: new FormControl(),
      mother: new FormControl(),
      brother: new FormControl(),
      sister: new FormControl(),
      brother1: new FormControl(),
      sister1: new FormControl()
    });
  }

  previous(num) {
    if (num == 1) {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = false;
    }
    if (num == 2) {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
      this.tab4 = false;
    }
    if (num == 3) {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
      this.tab4 = false;
    }
    if (num == 4) {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = true;
    }
  }
  next(num) {
    if (num == 1) {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
    }
    if (num == 2) {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
    }
    if (num == 3) {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
    }
    if (num == 4) {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = true;
    }
  }

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    if (event.target.value == "Married") {
      this._isChildrenInputOpen = true;
    } else {
      this._isChildrenInputOpen = false;
    }
  }

  //event handler for the select element's change event
  selectChange(event: any) {
    //update the ui
    if (event.target.value == "business") {
      this._isBusinessSelected = true;
    } else {
      this._isBusinessSelected = false;
    }
  }

  onSubmit(_submitForm: FormGroup) {
    console.error(_submitForm);
    console.error(this._basicProfileDetail.value);
    const user = _submitForm.value;
    const _formData = new FormData();
    _formData.append("user", JSON.stringify(user));
    _formData.append("file", this._userPhoto);

    this.apiService.saveGroomDetail(_formData).subscribe(
      res => {
        console.error("success!!" + res);
        this.route.navigate(["/home/detail"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  getDetails() {
    this.apiService.userMobNumData.subscribe(data => {
      this.number_detail = data;
    });
  }

  fileProgress(fileInput) {
    this.fileData = <File>fileInput.target.files[0];
    console.error(this.fileData);
    const file = fileInput.target.files[0];
    this._userPhoto = file;
    console.error(file);
    this.preview();
  }

  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }
}
