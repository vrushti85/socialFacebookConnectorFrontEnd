import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(private http: HttpClient) { }

  onEditProfile(body:any) {
    return this.http.get("http://localhost:5000/api/fetchPprofileEdit/"+body);
  }

  onSubmitEditProfile(updatedUser) {
    console.log("updatedUser",updatedUser);
    return this.http.put<any>("http://localhost:5000/api/storeEditedData",{updatedUser});
  }
}
