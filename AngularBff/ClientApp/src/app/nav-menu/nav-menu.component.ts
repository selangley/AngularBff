import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  loggedIn = false;
  logoutUrl = "/bff/logout";

  public claims: Claim[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string){
    http.get<Claim[]> (baseUrl + 'bff/user', { headers: {"X-CSRF": "1"}} ).subscribe(
      result => {

        // TODO: I guess I need to subscribe "better" to calls to 'bff/user' so that I update the logoutUrl after every login success and not just during component construction.

        const logoutUrl = result.find((claim) => claim.type === "bff:logout_url")?.value ?? this.logoutUrl;
      },
      error => {
        console.error(error);
        this.loggedIn = false;
      }
    )
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
interface Claim {
  type: string;
  value: string;
}
