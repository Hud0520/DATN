import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucComponent } from './danh-muc/danh-muc.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DonHangComponent } from './don-hang/don-hang.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NguoiDungComponent } from './nguoi-dung/nguoi-dung.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SanPhamComponent } from './san-pham/san-pham.component';
import { ThuongHieuComponent } from './thuong-hieu/thuong-hieu.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashBoardComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          breadcrumb: 'Thống kê',
        },
      },
      {
        path: 'brand',
        component: ThuongHieuComponent,
        data: {
          breadcrumb: 'Quản lý thương hiệu',
        },
      },
      {
        path: 'products',
        component: SanPhamComponent,
        data: {
          breadcrumb: 'Quản lý sản phẩm',
        },
      },
      {
        path: 'category',
        component: DanhMucComponent,
        data: {
          breadcrumb: 'Quản lý thể loại',
        },
      },
      {
        path: 'user',
        component: NguoiDungComponent,
        data: {
          breadcrumb: 'Quản lý người dùng',
        },
      },
      {
        path: 'bills',
        component: DonHangComponent,
        data: {
          breadcrumb: 'Quản lý hóa đơn',
        },
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
