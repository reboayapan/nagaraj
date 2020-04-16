import { ApiService } from "./../../../../common/services/api.service";
import { ApplicationService } from "./../../../../common/services/application.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  myLoginForm: FormGroup;
  mySingnUpForm: FormGroup;
  homeSearchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.mySingnUpForm = this.fb.group({
      fname: ["", [Validators.required, Validators.minLength(2)]],
      lname: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      dob: ["", Validators.required],
      number: ["", Validators.required],
      profile_created_for: ["", Validators.required],
      password: ["123", Validators.required],
      confirm_password: ["", [Validators.required]]
    });

    this.myLoginForm = this.fb.group({
      username: ["", Validators.required],
      lpassword: ["", Validators.required]
    });

    this.homeSearchForm = this.fb.group({
      looking_for: "",
      fromage: "",
      toage: "",
      sangam: "",
      city: ""
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.myLoginForm.controls;
  }

  checkLogin() {
    this.apiService.checkIsLogged(true);
    this.apiService.doLogin(this.myLoginForm).subscribe(
      res => {
        // this.HomePagePojo = res;
        // this.matchList = this.HomePagePojo.MATCHFIXTURELST;
        console.error("success!!")
        this.route.navigate(['/profile']);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSignUpSubmit() {
    console.error(this.mySingnUpForm);
      this.apiService.dataStored(this.mySingnUpForm.value.number);
      this.apiService.doSignUp(this.mySingnUpForm).subscribe(
        res => {
          console.error("success!!")
          console.error(this.mySingnUpForm.value.number)
          this.route.navigate(['/home/detail']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
