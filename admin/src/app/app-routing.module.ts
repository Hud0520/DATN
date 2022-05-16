import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QlBillComponent } from './pages/ql-bill/ql-bill.component';
import { QlBrandComponent } from './pages/ql-brand/ql-brand.component';
import { QlCategoryComponent } from './pages/ql-category/ql-category.component';
import { QlProductComponent } from './pages/ql-product/ql-product.component';
import { QlUserComponent } from './pages/ql-user/ql-user.component';
import { ThongkeComponent } from './pages/thongke/thongke.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'home',
        component: ThongkeComponent,
        data: {
          breadcrumb: 'Thống kê',
        },
      },
      {
        path: 'brand',
        component: QlBrandComponent,
        data: {
          breadcrumb: 'Quản lý thương hiệu',
        },
      },
      {
        path: 'products',
        component: QlProductComponent,
        data: {
          breadcrumb: 'Quản lý sản phẩm',
        },
      },
      {
        path: 'category',
        component: QlCategoryComponent,
        data: {
          breadcrumb: 'Quản lý thể loại',
        },
      },
      {
        path: 'user',
        component: QlUserComponent,
        data: {
          breadcrumb: 'Quản lý người dùng',
        },
      },
      {
        path: 'bills',
        component: QlBillComponent,
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
