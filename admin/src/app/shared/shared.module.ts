import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzNotificationModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzEmptyModule,
    NzResultModule,
    NzModalModule,
    NzDividerModule,
    NzInputNumberModule,
    NzSelectModule,
    NzImageModule,
    NzUploadModule,
    NzMessageModule,
    NzDatePickerModule,
    NzAvatarModule
  ],
  exports:[
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzNotificationModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzEmptyModule,
    NzResultModule,
    NzModalModule,
    NzDividerModule,
    NzInputNumberModule,
    NzSelectModule,
    NzImageModule,
    NzUploadModule,
    NzMessageModule,
    NzDatePickerModule,
    NzAvatarModule
  ]
})
export class SharedModule { }
