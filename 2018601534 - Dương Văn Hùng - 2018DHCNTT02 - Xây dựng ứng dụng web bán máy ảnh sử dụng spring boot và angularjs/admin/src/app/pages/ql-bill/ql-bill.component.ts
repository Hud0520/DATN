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
  hoadon: any;
  dateFormat = "yyyy-MM-dd";
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
      trangThai: [null],
      sodt: [null],
      userName: [null],
    });
  }
  showModal(data): void {
    this.isVisible = true;
    this.hoadon = data;
    this.getBillDetail(data.id);
  }

  handlePrint(): void {
    window.print();
  }
  handleOk() {
    this.isVisible = false;
  }
  search() {
    debugger;
    const billId = this.searchForm.controls.billID.value;
    const fromDate = this.searchForm.controls.fromDate.value;
    const toDate = this.searchForm.controls.toDate.value;
    const userName = this.searchForm.controls.userName.value;
    const sodt = this.searchForm.controls.sodt.value;
    const trangThai = this.searchForm.controls.trangThai.value;

    this.controlArray.set('id', billId);
    this.controlArray.set('tuNgay', this.convertDate(fromDate));
    this.controlArray.set('denNgay', this.convertDate(toDate));
    this.controlArray.set('hoTen', userName);
    this.controlArray.set('sdtNguoiNhan', sodt);
    this.controlArray.set('trangThai', trangThai);
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
    this.controlArray.set('sortBy', sortField);
    this.controlArray.set('order', sortOrder);
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
        if (data && data.data) {
          this.listOfBillDetail = data.data;
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
  changetrangThai(e, bill) {
    this.bill = bill;
    this.bill.trangThai = e;
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
