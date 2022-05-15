import { Component, OnInit } from '@angular/core';
import { DanhMuc } from 'src/app/entity/DanhMuc.model';
import { DanhMucService } from 'src/app/services/danh-muc.service';
import * as $ from "jquery";
@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.css']
})
export class DanhMucComponent implements OnInit {
  listDanhMuc : DanhMuc[] = [];
  constructor(
    private danhMucService : DanhMucService
  ) {}

  ngOnInit(): void {
    this.danhMucService.getAll().subscribe(e=>{
      this.listDanhMuc = e.result
    });
  }

  toggleModal() :void{
    $('.hero__categories ul').slideToggle(400);
  }

}
