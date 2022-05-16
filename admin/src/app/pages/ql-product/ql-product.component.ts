import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  imageUrl: string = null;
  pageIndex = 1;
  listOfData: Product[] = [];
  listOfCategory: Category[] = [];
  listOfBrand: Brand[] = [];
  product = new Product();
  isEdit = false;
  isInsert = false;
  isView = false;
  controlArray: Map<string, any> = new Map<string, any>();
  imageProduct: string;
  fileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private msg: NzMessageService
  ) {}

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
      productImage: [null, [Validators.required]],
      category1: [null, [Validators.required]],
      brand1: [null, [Validators.required]],
      productPrice: [0, [Validators.required]],
      productDescription: [null],
      productImportPrice: [0, [Validators.required]],
      productQuantily: [0, [Validators.required]],
      productDimensions: [null],
      productWeight: [0],
      productMaterial: [null],
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
          this.imageProduct = item.anh1;
          this.productForm.controls.category1.setValue(
            item.danhMuc
          );
          this.productForm.controls.brand1.setValue(
            item.nhanHieu
          );
          this.productForm.controls.productPrice.setValue(item.gia);
          this.productForm.controls.productDescription.setValue(
            item.chiTiet
          );
          this.productForm.controls.productImportPrice.setValue(
            item.gia
          );
          this.productForm.controls.productQuantily.setValue(
            item.soLuong
          );
          this.productForm.controls.productDimensions.setValue(
            item.cauHinh
          );
          this.productForm.controls.productWeight.setValue(item.tomTat);
          this.productForm.controls.productMaterial.setValue(
            item.tomTat
          );
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
          this.imageProduct = item.anh1;
          this.productForm.controls.category1.setValue(
            item.danhMuc
          );
          this.productForm.controls.brand1.setValue(
            item.nhanHieu
          );
          this.productForm.controls.productPrice.setValue(item.gia);
          this.productForm.controls.productDescription.setValue(
            item.chiTiet
          );
          this.productForm.controls.productImportPrice.setValue(
            item.gia
          );
          this.productForm.controls.productQuantily.setValue(
            item.soLuong
          );
          this.productForm.controls.productDimensions.setValue(
            item.cauHinh
          );
          this.productForm.controls.productWeight.setValue(item.tomTat);
          this.productForm.controls.productMaterial.setValue(
            item.tomTat
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
      this.productForm.controls.category1.setValue(null);
      this.productForm.controls.brand1.setValue(null);
      this.productForm.controls.productPrice.setValue(0);
      this.productForm.controls.productDescription.setValue(null);
      this.productForm.controls.productImportPrice.setValue(0);
      this.productForm.controls.productQuantily.setValue(0);
      this.productForm.controls.productDimensions.setValue(null);
      this.productForm.controls.productWeight.setValue(0);
      this.productForm.controls.productMaterial.setValue(null);
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
    this.product.anh1 = this.imageProduct;
    this.product.gia =
      this.productForm.controls.productImportPrice.value;
    this.product.chiTiet =
      this.productForm.controls.productDescription.value;
    this.product.gia = this.productForm.controls.productPrice.value;
    this.product.soLuong =
      this.productForm.controls.productQuantily.value;
    this.product.tomTat =
      this.productForm.controls.productDimensions.value;
    this.product.tomTat = this.productForm.controls.productWeight.value;
    this.product.tomTat =
      this.productForm.controls.productMaterial.value;
    console.log(this.product);
    console.log(this.fileToUpload);
    this.productService.saveProduct(this.product).subscribe(
      (data) => {
        if (data && data.result) {
          if (data.result.productID && this.fileToUpload) {
            console.log('vao');
            this.productService
              .postImage(data.result.productID, this.fileToUpload)
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
    this.controlArray.set('productID', id);
    this.controlArray.set('productName', name);
    this.controlArray.set('categoryID', category);
    this.controlArray.set('brandID', brand);
    this.controlArray.set('priceFrom', priceFrom);
    this.controlArray.set('priceTo', priceTo);
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
    this.controlArray.set('sortField', sortField);
    this.controlArray.set('sortOrder', sortOrder);
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
  onFileImageSelect(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);
    if (!this.checkImgUpload(this.fileToUpload.name)) {
      this.createNotification(
        'warning',
        'File không hợp lệ!',
        'Vui lòng chọn lại file hợp lệ.'
      );
    } else {
      //show image preview
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
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
