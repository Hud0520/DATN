import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DanhMuc } from 'src/entity/DanhMuc.model';
import { DanhMucService } from 'src/services/danh-muc.service';

@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.css']
})
export class DanhMucComponent implements OnInit {

  constructor(
    private categoryService: DanhMucService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) {}
  isVisible = false;
  total = 1;
  loading = true;
  pageSize = 5;
  pageIndex = 1;
  listOfData: DanhMuc[] = [];
  category = new DanhMuc();
  isEdit= false;
  validateForm!: FormGroup;
  controlArray: Map<string, any> = new  Map<string, any>();
  ngOnInit(): void {
    // this.getCategories(this.pageIndex, this.pageSize, null, null);
    this.validateForm = this.fb.group({
      categoryId: [null],
      categoryName: [null, [Validators.required]]
    });
  }
  showModal(id : any): void {
    this.isVisible = true;
    if(id){
      this.isEdit= true;
      this.listOfData.forEach((item) => {
        if (item.id == id){
          this.validateForm.controls.categoryId.setValue(item.id);
          this.validateForm.controls.categoryName.setValue(item.tenDanhMuc);
        } 
      });
    }else{
      this.validateForm.controls.categoryId.setValue(null);
      this.validateForm.controls.categoryName.setValue('');
    }
  }

  handleOk(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    const categoryId = this.validateForm.controls.categoryId.value;
    const categoryName = this.validateForm.controls.categoryName.value;
    if(categoryId && categoryName){
      this.category.id= categoryId;
      this.category.tenDanhMuc = categoryName;
      
      this.categoryService.saveCategory(this.category).subscribe(
        (data) => {
          this.createNotification('success', 'S???a th??nh c??ng!', '');
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
          this.getCategories(this.pageIndex, this.pageSize, null, null);
        }
      );
    }else if(categoryName){
      this.category.id= "";
      this.category.tenDanhMuc = categoryName;
      
      this.categoryService.saveCategory(this.category).subscribe(
        (data) => {
          this.createNotification('success', 'Th??m th??nh c??ng!', '');
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
          this.getCategories(this.pageIndex, this.pageSize, null, null);
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
    this.getCategories(pageIndex, pageSize, sortField, sortOrder);
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  getCategories(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    this.controlArray.set('pageIndex', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortField', sortField);
    this.controlArray.set('sortOrder', sortOrder);
    // get category
    this.categoryService
      .getCategories(this.controlArray)
      .subscribe(
        (data) => {
          if (data && data.results) {
            this.loading = false;
            this.listOfData = data.results;
            this.total = data.rowCount;
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

  delCategory(id : any) {
    this.modal.confirm({
      nzTitle: 'B???n c?? ch???c ch???n mu???n x??a?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.categoryService.deleteCategory(id).subscribe(
          (data) => {
            this.createNotification('success', 'Xo?? th??nh c??ng!', '');
          },
          (error) => {
            this.createNotification(
              'error',
              'C?? l???i x???y ra!',
              'Vui l??ng li??n h??? qu???n tr??? vi??n.'
            );
          },
          () => {
            this.getCategories(this.pageIndex, this.pageSize, null, null);
          }
        ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

}
