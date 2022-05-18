import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Brand } from 'src/app/entity/Brand.model';
import { Category } from 'src/app/entity/Category.model';
import { Product } from 'src/app/entity/Product.model';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ql-product',
  templateUrl: './ql-product.component.html',
  styleUrls: ['./ql-product.component.css'],
})
export class QlProductComponent implements OnInit {
  searchForm!: FormGroup;
  productForm!: FormGroup;
  isVisible = false;
  total = 1;
  loading = true;
  pageSize = 5;
  imageUrl: string[] = [];
  pageIndex = 1;
  listOfData: Product[] = [];
  listOfCategory: Category[] = [];
  listOfBrand: Brand[] = [];
  product = new Product();
  isEdit = false;
  isInsert = false;
  isView = false;
  controlArray: Map<string, any> = new Map<string, any>();
  imageProduct: string[] = [];
  fileToUpload: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private msg: NzMessageService,
    private router : Router
  ) {
    let auth = sessionStorage.getItem('auth')||'';
    if(auth == ''){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
    //form search
    this.searchForm = this.fb.group({
      productId:[null],
      productName: [null],
      category: [null],
      brand: [null],
      priceFrom: [0],
      priceTo: [0],
    });
    // form product
    this.productForm = this.fb.group({
      productID: [null],
      productName: [null, [Validators.required]],
      category1: [null, [Validators.required]],
      brand1: [null, [Validators.required]],
      productPrice: [0, [Validators.required]],
      thongSo: [null],
      chiTiet: [null],
      productQuantily: [0, [Validators.required]],
      cauHinh: [null],
      phuKien: [0],
      tomTat: [null],
      anh1:[null],
      anh2:[null],
      anh3:[null],
      anh4:[null],
      baoHanh: [null]
    });
  }
  showModal(id, action): void {
    this.isVisible = true;
    if (action == 'VIEW') {
      this.isView = true;
      this.isEdit = false;
      this.isInsert = false;

      this.listOfData.forEach((item) => {
        if (item.id == id) {
          this.productForm.controls.productID.setValue(item.id);
          this.productForm.controls.productName.setValue(item.tenSanPham);
          this.productForm.controls.category1.setValue(
            item.danhMuc
          );
          this.productForm.controls.brand1.setValue(
            item.nhanHieu
          );
          this.productForm.controls.productPrice.setValue(item.gia);
          this.productForm.controls.thongSo.setValue(
            item.thongSo
          );
          this.productForm.controls.chiTiet.setValue(
            item.chiTiet
          );
          this.productForm.controls.productQuantily.setValue(
            item.soLuong
          );
          this.productForm.controls.cauHinh.setValue(
            item.cauHinh
          );
          this.productForm.controls.tomTat.setValue(item.tomTat);
          this.productForm.controls.phuKien.setValue(
            item.phuKien
          );
          this.imageProduct[0] = item.anh1;
          this.imageProduct[1] = item.anh2;
          this.imageProduct[2] = item.anh3;
          this.imageProduct[3] = item.anh4;
        }
      });
    }
    if (action == 'EDIT') {
      this.isEdit = true;
      this.isInsert = false;
      this.isView = false;
      this.listOfData.forEach((item) => {
        if (item.id == id) {
          this.productForm.controls.productID.setValue(item.id);
          this.productForm.controls.productName.setValue(item.tenSanPham);
          this.productForm.controls.category1.setValue(
            item.danhMuc
          );
          this.productForm.controls.brand1.setValue(
            item.nhanHieu
          );
          this.productForm.controls.productPrice.setValue(item.gia);
          this.productForm.controls.thongSo.setValue(
            item.thongSo
          );
          this.productForm.controls.chiTiet.setValue(
            item.chiTiet
          );
          this.productForm.controls.productQuantily.setValue(
            item.soLuong
          );
          this.productForm.controls.cauHinh.setValue(
            item.cauHinh
          );
          this.productForm.controls.tomTat.setValue(item.tomTat);
          this.productForm.controls.phuKien.setValue(
            item.phuKien
          );
        }
      });
    }
    if (action == 'INSERT') {
      this.isEdit = false;
      this.isInsert = true;
      this.isView = false;

      this.productForm.controls.productID.setValue(null);
          this.productForm.controls.productName.setValue(null);
          this.productForm.controls.category1.setValue(
            null
          );
          this.productForm.controls.brand1.setValue(
            null
          );
          this.productForm.controls.productPrice.setValue(0);
          this.productForm.controls.thongSo.setValue(
            null
          );
          this.productForm.controls.chiTiet.setValue(
            null
          );
          this.productForm.controls.productQuantily.setValue(
            0
          );
          this.productForm.controls.cauHinh.setValue(
            null
          );
          this.productForm.controls.tomTat.setValue(null);
          this.productForm.controls.phuKien.setValue(
            null
          );
    }
  }

  handleOk(): void {
    if (this.isView) {
      this.isVisible = false;
      return;
    }
    for (const i in this.productForm.controls) {
      if (this.productForm.controls.hasOwnProperty(i)) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
    this.product.id = this.productForm.controls.productID.value;
    this.product.tenSanPham = this.productForm.controls.productName.value;
    this.product.danhMuc = this.productForm.controls.category1.value,

    this.product.nhanHieu = this.productForm.controls.brand1.value,
    this.product.anh1 = this.imageProduct[0];
    this.product.anh2 = this.imageProduct[1];
    this.product.anh3 = this.imageProduct[2];
    this.product.anh4 = this.imageProduct[3];
    this.product.chiTiet =
      this.productForm.controls.chiTiet.value;
    this.product.gia = this.productForm.controls.productPrice.value;
    this.product.soLuong =
      this.productForm.controls.productQuantily.value;
    this.product.tomTat =
      this.productForm.controls.tomTat.value;
      this.product.thongSo =
      this.productForm.controls.thongSo.value;
      this.product.cauHinh = this.productForm.controls.cauHinh.value;
      this.product.phuKien = this.productForm.controls.phuKien.value;
    console.log(this.product);
    console.log(this.fileToUpload);
    this.productService.saveProduct(this.product).subscribe(
      (data) => {
        debugger;
        if (data.errCode =="00") {
          if (data.data.id && this.fileToUpload) {
            console.log('vao');
            this.productService
              .postImage(data.data.id, this.fileToUpload)
              .subscribe(
                (data) => {},
                (error) => {
                  this.createNotification(
                    'error',
                    'Có lỗi xảy ra!',
                    'Vui lòng liên hệ quản trị viên.'
                  );
                }
              );
          }
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
        this.isVisible = false;
        this.getProducts(this.pageIndex, this.pageSize, null, null);
      }
    );
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  search() {
    const id = this.searchForm.controls.productId.value;
    const name = this.searchForm.controls.productName.value;
    const category = this.searchForm.controls.category.value;
    const brand = this.searchForm.controls.brand.value;
    const priceFrom =
      this.searchForm.controls.priceFrom.value == 0
        ? null
        : this.searchForm.controls.priceFrom.value;
    const priceTo =
      this.searchForm.controls.priceTo.value == 0
        ? null
        : this.searchForm.controls.priceTo.value;
    this.controlArray.set('id', id);
    this.controlArray.set('tenSanPham', name);
    this.controlArray.set('danhMuc', category);
    this.controlArray.set('nhanHieu', brand);
    this.controlArray.set('giatu', priceFrom);
    this.controlArray.set('giaden', priceTo);
    this.getProducts(this.pageIndex, this.pageSize, null, null);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.getProducts(pageIndex, pageSize, sortField, sortOrder);
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  getProducts(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    this.controlArray.set('page', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortBy', sortField);
    this.controlArray.set('order', sortOrder);
    // get product
    this.productService.getProducts(this.controlArray).subscribe(
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

  delProduct(id) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.productService.deleteProduct(id).subscribe(
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
            this.getProducts(this.pageIndex, this.pageSize, null, null);
          }
        ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfCategory = data.result;
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
  getBrands() {
    this.brandService.getAllBrand().subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfBrand = data.result;
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
  onFileImageSelect(file: FileList,index : number) {
    this.fileToUpload[index] = file.item(0);
    console.log(this.fileToUpload);
    if (!this.checkImgUpload(this.fileToUpload[index].name)) {
      this.createNotification(
        'warning',
        'File không hợp lệ!',
        'Vui lòng chọn lại file hợp lệ.'
      );
    } else {
      //show image preview
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl[index] = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload[index]);
    }
  }
  checkImgUpload(name: string) {
    var allowedExtensions =
      /(\.jpg|\.jpeg|\.png|\.gif|\.tiff|\.bmp|\.xbm|\.tif|\.pjp|\.svgz|\.ico|\.webp|\.pjpeg|\.avif|\.jfif)$/i;
    if (!allowedExtensions.exec(name)) {
      return false;
    }
    return true;
  }
}
