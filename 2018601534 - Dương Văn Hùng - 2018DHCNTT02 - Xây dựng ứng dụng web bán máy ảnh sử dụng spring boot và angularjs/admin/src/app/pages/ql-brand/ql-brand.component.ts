import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from '../../entity/Brand.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ql-brand',
  templateUrl: './ql-brand.component.html',
  styleUrls: ['./ql-brand.component.css'],
})
export class QlBrandComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private router : Router
  ) {
    let auth = sessionStorage.getItem('auth')||'';
    if(auth == ''){
      this.router.navigate(['/login']);
    }
  }
  isVisible = false;
  total = 1;
  loading = true;
  pageSize = 5;
  pageIndex = 1;
  listOfData: Brand[] = [];
  brand = new Brand();
  isEdit = false;
  validateForm!: FormGroup;
  controlArray: Map<string, any> = new  Map<string, any>();

  ngOnInit(): void {
    // this.getBrands(this.pageIndex, this.pageSize, null, null);
    this.validateForm = this.fb.group({
      brandId: [null],
      brandName: [null, [Validators.required]],
      tenVanTat: [null, [Validators.required]],
    });
  }
  showModal(id): void {
    this.isVisible = true;
    if (id) {
      this.isEdit = true;
      this.listOfData.forEach((item) => {
        if (item.id == id) {
          this.validateForm.controls.brandId.setValue(item.id);
          this.validateForm.controls.brandName.setValue(item.tenNhanHieu);
          this.validateForm.controls.tenVanTat.setValue(item.tenVanTat);
        }
      });
    } else {
      this.validateForm.controls.brandId.setValue(null);
      this.validateForm.controls.brandName.setValue('');
      this.validateForm.controls.tenVanTat.setValue('');
    }
  }

  handleOk(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    const brandId = this.validateForm.controls.brandId.value;
    const brandName = this.validateForm.controls.brandName.value;
    const tenVanTat = this.validateForm.controls.tenVanTat.value;
    if (brandName && brandId) {
      this.brand.id = brandId;
      this.brand.tenNhanHieu = brandName;
      this.brand.tenVanTat = tenVanTat;

      this.brandService.saveBrand(this.brand).subscribe(
        (data) => {
          if(data.errCode == '00'){
            this.createNotification('success', 'S???a th??nh c??ng!', '');
          }else{
            this.createNotification('error', 'L???i', data.errMsg);
          }
        },
        (error) => {
          this.createNotification(
            'error',
            'C?? l???i x???y ra!',
            'Vui l??ng li??n h??? qu???n tr??? vi??n.'
          );
        },
        () => {
          this.isVisible = false;
          this.getBrands(this.pageIndex, this.pageSize, null, null);
        }
      );
    } else if (brandName) {
      this.brand.id = null;
      this.brand.tenNhanHieu = brandName;
      this.brand.tenVanTat = tenVanTat;
      this.brandService.saveBrand(this.brand).subscribe(
        (data) => {
          if(data.errCode == '00'){
            this.createNotification('success', 'Th??m th??nh c??ng!', '');
          }else{
            this.createNotification('error', 'L???i', data.errMsg);
          }
        },
        (error) => {
          this.createNotification(
            'error',
            'C?? l???i x???y ra!',
            'Vui l??ng li??n h??? qu???n tr??? vi??n.'
          );
        },
        () => {
          this.isVisible = false;
          this.getBrands(this.pageIndex, this.pageSize, null, null);
        }
      );
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.getBrands(pageIndex, pageSize, sortField, sortOrder);
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  getBrands(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    // get brands
    this.controlArray.set('page', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortBy', sortField);
    this.controlArray.set('order', sortOrder);
    this.brandService.getBrands(this.controlArray).subscribe(
      (data) => {
        if (data && data.result) {
          this.loading = false;
          this.listOfData = data.result;
          this.total = data.total;
        }
      },
      (error) => {
        this.createNotification(
          'error',
          'C?? l???i x???y ra!',
          'Vui l??ng li??n h??? qu???n tr??? vi??n.'
        );
      }
    );
  }

  delBrand(id) {
    this.modal.confirm({
      nzTitle: 'B???n c?? ch???c ch???n mu???n x??a?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.brandService.deleteBrand(id).subscribe(
          (data) => {
            if(data.errCode =='00'){
              this.createNotification('success', 'Xo?? th??nh c??ng!', '');
            }else{
              this.createNotification('error',"L???i ", data.errMsg);
            }
          },
          (error) => {
            this.createNotification(
              'error',
              'C?? l???i x???y ra!',
              'Vui l??ng li??n h??? qu???n tr??? vi??n.'
            );
          },
          () => {
            this.getBrands(this.pageIndex, this.pageSize, null, null);
          }
        ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
