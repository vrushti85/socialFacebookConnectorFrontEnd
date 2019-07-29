import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ApiHttpService } from '../../api-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  profileForm: FormGroup;
  profileData: object = {};
  userData: any = {};

  constructor(private apiHttpService: ApiHttpService, private formBuilder: FormBuilder, private router: Router) {
    this.intialForm();
    this.userData = JSON.parse(localStorage.getItem('data'));
  }

  ngOnInit() {
    this.apiHttpService.onEditProfile(this.userData.id).subscribe((resData) => {
      console.log("response from api profile", resData);
      this.profileData = resData;
      this.fetchProfileData();
    }, err => {
      alert(err);
    });
  }

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  onSubmit() {
    let updateobj = this.profileForm.value;
    console.log(updateobj);
    return this.apiHttpService.onSubmitEditProfile(updateobj).subscribe((data) => {
      this.router.navigate(['/home']);
      alert("Your Profile Saved Successfully");
    });
  }

  fetchProfileData() {
    this.profileForm.patchValue({
      name: this.profileData['name'],
      email: this.profileData['email'],
      Id: this.profileData['_id'],
    });
  }

  intialForm() {
    this.profileForm = this.formBuilder.group({
      'image': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.email, Validators.required]),
      'dateOfBirth': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'Id': new FormControl('', Validators.required),
    })
  }

  onResetForm() {
    this.intialForm();
    this.imgURL = '';
  }

  onCancel() {
    this.intialForm();
    this.router.navigate(['/home']);
  }
}

