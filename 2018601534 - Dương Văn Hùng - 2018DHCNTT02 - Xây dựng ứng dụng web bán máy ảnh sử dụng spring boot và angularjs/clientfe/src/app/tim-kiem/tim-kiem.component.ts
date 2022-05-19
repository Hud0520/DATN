import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tim-kiem',
  templateUrl: './tim-kiem.component.html',
  styleUrls: ['./tim-kiem.component.css']
})
export class TimKiemComponent implements OnInit {

  keyword : string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  timkiem(keyword : any){
    debugger;
    this.router.navigate([`cua-hang/timkiem/`,keyword]);
  }

}
