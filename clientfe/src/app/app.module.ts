import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './page/header/header.component';
import { FooterComponent } from './page/footer/footer.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './page/home/home.component';
import { SharedModule } from './shared/shared.module';
import { DanhMucComponent } from './page/danh-muc/danh-muc.component';
import { ChiTietComponent } from './page/chi-tiet/chi-tiet.component';
import { LienHeComponent } from './page/lien-he/lien-he.component';
import { CuaHangComponent } from './page/cua-hang/cua-hang.component';
import { GioHangComponent } from './page/gio-hang/gio-hang.component';
import { DatHangComponent } from './page/dat-hang/dat-hang.component';
import { TimKiemComponent } from './tim-kiem/tim-kiem.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { NotFoundComponent } from './not-found/not-found.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DanhMucComponent,
    ChiTietComponent,
    LienHeComponent,
    CuaHangComponent,
    GioHangComponent,
    DatHangComponent,
    TimKiemComponent,
    PaySuccessComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
