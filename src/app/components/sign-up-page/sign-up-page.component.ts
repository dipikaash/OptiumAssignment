import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  
  public userForm!: FormGroup; 
  constructor(private http: HttpClient,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['',Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: ['',Validators.required]
    });
  }
  SignUpSubmit(){
    console.log(this.userForm.value);
    this.http.post<any>('http://localhost:3000/signupUsersList',this.userForm.value).subscribe((res)=>{
      alert('SIGNIN SUCCESFUL');
      this.userForm.reset();
    })
  }
}
