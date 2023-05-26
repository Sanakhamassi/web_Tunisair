import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'cdk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: String;
  password: String;

  login() {
    this.http.post<any>('http://localhost:8080/oauth/signin', {
      "email": this.email,
      "password": this.password,
    }
    ).subscribe(data => {
      this.redirectTodashboard()
      return data;
    })
    error => {
      console.error(error);
    }
  }
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
  redirectTodashboard() {
    this.router.navigate(['/dashboard']);
  }
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

}
