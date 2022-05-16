import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { SanPhamComponent } from './san-pham/san-pham.component';
import { NguoiDungComponent } from './nguoi-dung/nguoi-dung.component';
import { DonHangComponent } from './don-hang/don-hang.component';
import { DanhMucComponent } from './danh-muc/danh-muc.component';
import { ThuongHieuComponent } from './thuong-hieu/thuong-hieu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzResizeObserverFactory } from 'ng-zorro-antd/cdk/resize-observer';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgChartsModule } from 'ng2-charts';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    SanPhamComponent,
    NguoiDungComponent,
    DonHangComponent,
    DanhMucComponent,
    ThuongHieuComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    SharedModule,
    NzTableModule,
    NgChartsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: NzResizeObserverFactory,
      useValue: {
        create(callback: ResizeObserverCallback): ResizeObserver | null {
          return typeof ResizeObserver === 'undefined'
            ? null
            : new ResizeObserver(callback);
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
