import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { IconsProviderModule } from './icons-provider.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { ThongkeComponent } from './pages/thongke/thongke.component';
import { QlBrandComponent } from './pages/ql-brand/ql-brand.component';
import { QlProductComponent } from './pages/ql-product/ql-product.component';
import { QlCategoryComponent } from './pages/ql-category/ql-category.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzResizeObserverFactory } from 'ng-zorro-antd/cdk/resize-observer';
import ResizeObserver from 'resize-observer-polyfill';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QlBillComponent } from './pages/ql-bill/ql-bill.component';
import { QlUserComponent } from './pages/ql-user/ql-user.component';
import { ChartsModule } from 'ng2-charts';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ThongkeComponent,
    QlBrandComponent,
    QlProductComponent,
    QlCategoryComponent,
    NotFoundComponent,
    QlBillComponent,
    QlUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    SharedModule,
    NzTableModule,
    ChartsModule
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
  bootstrap: [AppComponent],
})
export class AppModule {}
