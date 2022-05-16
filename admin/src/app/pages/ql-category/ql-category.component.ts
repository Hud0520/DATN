import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder
  ) {}
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
      categoryName: [null, [Validators.required]]
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
          this.createNotification('success', 'Sửa thành công!', '');
        },
        (error) => {
          this.createNotification(
            'error',
            'Có lỗi xảy ra!',
            'Vui lòng liên hệ quản trị viên.'
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
      
      this.categoryService.saveCategory(this.category).subscribe(
        (data) => {
          this.createNotification('success', 'Thêm thành công!', '');
        },
        (error) => {
          this.createNotification(
            'error',
            'Có lỗi xảy ra!',
            'Vui lòng liên hệ quản trị viên.'
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
    this.controlArray.set('sortField', sortField);
    this.controlArray.set('sortOrder', sortOrder);
    // get category
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
            'Có lỗi xảy ra!',
            'Vui lòng liên hệ quản trị viên.'
          );
        }
      );
  }

  delCategory(id) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.categoryService.deleteCategory(id).subscribe(
          (data) => {
            this.createNotification('success', 'Xoá thành công!', '');
          },
          (error) => {
            this.createNotification(
              'error',
              'Có lỗi xảy ra!',
              'Vui lòng liên hệ quản trị viên.'
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
