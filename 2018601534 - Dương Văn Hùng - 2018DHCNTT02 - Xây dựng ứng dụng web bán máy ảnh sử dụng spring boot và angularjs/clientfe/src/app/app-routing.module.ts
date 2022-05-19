import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChiTietComponent } from './page/chi-tiet/chi-tiet.component';
import { CuaHangComponent } from './page/cua-hang/cua-hang.component';
import { DatHangComponent } from './page/dat-hang/dat-hang.component';
import { GioHangComponent } from './page/gio-hang/gio-hang.component';
import { HomeComponent } from './page/home/home.component';
import { LienHeComponent } from './page/lien-he/lien-he.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'chitiet/:id',
    component:ChiTietComponent ,
  },
  {
    path:'cua-hang',
    component: CuaHangComponent
  },
  {
    path:'gio-hang',
    component: GioHangComponent
  },
  {
    path: 'pay-success',
    component: PaySuccessComponent,
  },
  {
    path:'dat-hang',
    component: DatHangComponent
  },
  {
    path:"cua-hang/timkiem/:keyword",
    component: CuaHangComponent
  },
  {
    path:"lien-he",
    component:LienHeComponent
  },{
    path:"cua-hang/:danhMucId",
    component: CuaHangComponent
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
