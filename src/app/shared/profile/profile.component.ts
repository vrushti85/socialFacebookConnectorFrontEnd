import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ApiHttpService } from 'src/app/api-http.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  profileForm: FormGroup;
  profileData: object = {};
  userData:any={};
  constructor(private apiHttpService: ApiHttpService, private formBuilder: FormBuilder) {

    this.profileForm = this.formBuilder.group({
      'image': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.email, Validators.required]),
      'dateOfBirth': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'providerId': new FormControl('', Validators.required),
    })
    this.userData=JSON.parse(localStorage.getItem('data'));
  }

  ngOnInit() {
    console.log("hii");
    this.apiHttpService.onEditProfile(this.userData.id).subscribe((resData) => {
      console.log("response from api profile", resData);
      this.profileData = resData;
      this.fetchProfileData();
    }, err => {
      console.log(err);
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
    this.apiHttpService.onSubmitEditProfile(updateobj).subscribe((data)=>{
      console.log(data);
    });
  }
  fetchProfileData() {
    this.profileForm.patchValue({
      name: this.profileData['name'],
      email: this.profileData['email'],
      providerId: this.profileData['providerId']
    });
    console.log(this.profileData);
  }
}
