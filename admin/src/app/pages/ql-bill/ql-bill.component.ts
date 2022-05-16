import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Bill } from 'src/app/entity/Bill.model';
import { BillService } from 'src/app/services/bill.service';
import { ProductService } from 'src/app/services/product.service';
import { Common } from 'src/app/shared/Common';

@Component({
  selector: 'app-ql-bill',
  templateUrl: './ql-bill.component.html',
  styleUrls: ['./ql-bill.component.css'],
})
export class QlBillComponent implements OnInit {
  searchForm!: FormGroup;
  isVisible = false;
  total = 1;
  loading = true;
  pageSize = 5;
  imageUrl: string = null;
  pageIndex = 1;
  listOfData: Bill[] = [];
  controlArray: Map<string, any> = new Map<string, any>();
  listOfBillDetail: any;
  billId: string;
  bill: Bill;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private billService: BillService,
    private router : Router
  ) {
    let auth = sessionStorage.getItem('auth')||'';
    if(auth == ''){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    //form search
    this.searchForm = this.fb.group({
      billID: [null],
      fromDate: [null],
      toDate: [null],
      priceFrom: [0],
      priceTo: [0],
      userName: [null],
    });
  }
  showModal(id): void {
    this.isVisible = true;
    this.billId = id;
    this.getBillDetail(id);
  }

  handlePrint(): void {
    window.print();
  }
  handleOk() {
    this.isVisible = false;
  }
  search() {
    const billId = this.searchForm.controls.billID.value;
    const fromDate = this.searchForm.controls.fromDate.value;
    const toDate = this.searchForm.controls.toDate.value;
    const userName = this.searchForm.controls.userName.value;
    const priceFrom =
      this.searchForm.controls.priceFrom.value == 0
        ? null
        : this.searchForm.controls.priceFrom.value;
    const priceTo =
      this.searchForm.controls.priceTo.value == 0
        ? null
        : this.searchForm.controls.priceTo.value;
    this.controlArray.set('billID', billId);
    this.controlArray.set('fromDate', this.convertDate(fromDate));
    this.controlArray.set('toDate', this.convertDate(toDate));
    this.controlArray.set('userName', userName);
    this.controlArray.set('priceFrom', priceFrom);
    this.controlArray.set('priceTo', priceTo);
    console.log(this.controlArray);
    this.getBills(this.pageIndex, this.pageSize, null, null);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.getBills(pageIndex, pageSize, sortField, sortOrder);
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  getBills(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    this.controlArray.set('page', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortField', sortField);
    this.controlArray.set('sortOrder', sortOrder);
    // get bill
    this.billService.getBills(this.controlArray).subscribe(
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
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      }
    );
  }
  getBillDetail(id) {
    this.billService.getBillDetail(id).subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfBillDetail = data.result;
        }
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      }
    );
  }
  cancelBill(data) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn hủy đơn?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        if (data.status === 'Delivered') {
          this.createNotification(
            'warning',
            'Đơn hàng đã giao không thể hủy!',
            ''
          );
        } else {
          this.billService.cancelBill(data).subscribe(
            (data) => {
              if (data && data.errorCode === '1002') {
                this.createNotification('success', 'Hủy thành công!', '');
              }
            },
            (error) => {
              this.createNotification(
                'error',
                'Có lỗi xảy ra!',
                'Vui lòng liên hệ quản trị viên.'
              );
            },
            () => {
              this.getBills(this.pageIndex, this.pageSize, null, null);
            }
          );
        }
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
  changeStatus(e, bill) {
    this.bill = bill;
    this.bill.status = e;
    this.billService.saveBill(this.bill).subscribe(
      (data) => {
        this.createNotification('success', 'Thay đổi thành công!', '');
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      },
      () => {
        this.getBills(this.pageIndex, this.pageSize, null, null);
      }
    );
  }
  exportExcel(): void {
    this.billService.exportBills(this.controlArray).subscribe(
      (data) => {
        this.downLoadFile(data, 'application/ms-excel');
      },
      (err) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      }
    );
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    let date = new Date();
    link.download =
      'BaoCao' +
      date.getDate() +
      '/' +
      date.getMonth() +
      '/' +
      date.getFullYear() +
      '.xlsx';
    link.click();
  }

  convertDate(str) {
    if (str) {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join('/');
    }
    return null;
  }
}
