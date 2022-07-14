import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Claim } from 'src/app/claim';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {

  claims: Claim[] = [];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Claim[]>(baseUrl + 'bff/user', { headers: { "X-CSRF": "1" } }).subscribe(
      result => {
        this.claims = result;
      },
      error => console.error(error));
  }

  ngOnInit(): void {
    console.log('');
  }

}
interface Claim {
  type: string;
  value: string;
}
