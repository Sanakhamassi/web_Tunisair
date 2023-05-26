import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  email: String;
  password: String;
  confirmPass: String

  registre() {
    if (this.password == this.confirmPass) {

      this.http.post<any>('http://localhost:8080/oauth/addUser', {
        "email": this.email,
        "password": this.password,
      }
      ).subscribe(data => {
        this.router.navigate(['/login']);
        return data;

      })
    }
    else {
      this.showNotification('top', 'center', "Password does not match");

    }
    error => {

      this.showNotification('top', 'center', "User alraedy exists");

      console.error(error);
    }
  }
  showNotification(from, align, text) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    var color = 'danger';
    $.notify({
      icon: "pe-7s-info",
      message: text
    }, {
      type: 'danger',
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }
}
