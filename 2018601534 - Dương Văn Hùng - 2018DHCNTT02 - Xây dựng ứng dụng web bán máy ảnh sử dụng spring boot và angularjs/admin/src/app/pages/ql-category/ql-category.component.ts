import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Category } from 'src/app/entity/Category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-ql-category',
  templateUrl: './ql-category.component.html',
  styleUrls: ['./ql-category.component.css']
})
export class QlCategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
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
  listOfData: Category[] = [];
  category = new Category();
  isEdit= false;
  validateForm!: FormGroup;
  controlArray: Map<string, any> = new  Map<string, any>();
  ngOnInit(): void {
    // this.getCategories(this.pageIndex, this.pageSize, null, null);
    this.validateForm = this.fb.group({
      categoryId: [null],
      categoryName: [null, [Validators.required]],
      categoryDesc:[null]
    });
  }
  showModal(id): void {
    this.isVisible = true;
    if(id){
      this.isEdit= true;
      this.listOfData.forEach((item) => {
        if (item.id == id){
          this.validateForm.controls.categoryId.setValue(item.id);
          this.validateForm.controls.categoryName.setValue(item.tenDanhMuc);
          this.validateForm.controls.categoryDesc.setValue(item.moTa);
        } 
      });
    }else{
      this.validateForm.controls.categoryId.setValue(null);

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
    const categoryDesc = this.validateForm.controls.categoryDesc.value;
    if(categoryId && categoryName){
      this.category.id= categoryId;
      this.category.tenDanhMuc = categoryName;
      this.category.moTa = categoryDesc;
      
      this.categoryService.saveCategory(this.category).subscribe(
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
          this.getCategories(this.pageIndex, this.pageSize, null, null);
        }
      );
    }else if(categoryName){
      this.category.id= null;
      this.category.tenDanhMuc = categoryName;
      this.category.moTa = categoryDesc;
      this.categoryService.addCategory(this.category).subscribe(
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
    this.controlArray.set('page', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortBy', sortField);
    this.controlArray.set('order', sortOrder);
    // get category
    debugger;
    this.categoryService
      .getCategories(this.controlArray)
      .subscribe(
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

  delCategory(id) {
    this.category.id= id;
    this.modal.confirm({
      nzTitle: 'B???n c?? ch???c ch???n mu???n x??a?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.categoryService.deleteCategory(this.category).subscribe(
          (data) => {
            debugger
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
            this.getCategories(this.pageIndex, this.pageSize, null, null);
          }
        ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

}
