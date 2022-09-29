import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent implements OnInit {

  public logInForm!: FormGroup;
  public isLoggedIn = '1'; 
  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['',Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: ['',Validators.required]
    });
  }
  logInSubmit(){
    console.log(this.logInForm.value);
    this.http.get<any>('../../../assets/db.json').subscribe((response)=>
     {console.log(response.logInList);
      const user = response.logInList.find((a:any)=>{
      return a.email === this.logInForm.value.email && a.password === this.logInForm.value.password ;
    });
    if(user){
      this.logInForm.reset();
      localStorage.setItem('session', this.isLoggedIn);
      this.router.navigate(["dashboard"]);
    }else{
      alert("user not found");
    }
  },err=>{
    alert("Something went wrong");
  });
  }
}
