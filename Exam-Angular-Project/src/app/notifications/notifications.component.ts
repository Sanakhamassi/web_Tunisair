import { Component, Injectable, OnInit } from '@angular/core';

declare var $: any;
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
@Injectable()
export class NotificationsComponent implements OnInit {

  phoneNum: String
  msgBody: String
  mailmsgBody: String
  mailObject: String
  mail: String
  fileName = '';
  path = 'C:/Users/sanak/Downloads/'
  absolutePath = ''
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      this.absolutePath = this.path.concat(this.fileName);

      console.log(this.absolutePath);
    }
  }
  sendMail() {
    if (this.fileName != '') {
      this.http.post<any>('http://localhost:8080/api/send-mail-attachment',
        {
          "recipient": this.mail,
          "subject": this.mailObject,
          "msgBody": this.mailmsgBody,
          "attachment": this.absolutePath
        }


      ).subscribe(data => {
        return data;
      })
    }
    else {
      this.http.post<any>('http://localhost:8080/api/send-mail', {
        "recipient": this.mail,
        "subject": this.mailObject,
        "msgBody": this.mailmsgBody

      }
      ).subscribe(data => {
        return data;
      })
    }
    this.showNotification('top', 'center');
  }
  sendSms() {
    this.http.post<any>('http://localhost:8080/v1/sms', { "alert-message": this.msgBody }
    ).subscribe(data => {
      return data;
    })
    this.showNotification('top', 'center');

  }

  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    var color = 'Math.floor((Math.random() * 4) + 1)';
    $.notify({
      icon: "pe-7s-gift",
      message: "Notif sent to " + this.msgBody
    }, {
      type: type[color],
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }
}
