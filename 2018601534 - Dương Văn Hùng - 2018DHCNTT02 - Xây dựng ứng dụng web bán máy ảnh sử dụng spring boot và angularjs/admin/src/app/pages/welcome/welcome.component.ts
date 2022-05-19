import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  ngOnInit(): void {
    // if(localStorage.getItem('auth')){
    //   this.isLogined = true;
    //   this.userName = localStorage.getItem('username')||'';
    // }
  }
  userName = '';
  isLogined = true;
  isCollapsed = false;

}
