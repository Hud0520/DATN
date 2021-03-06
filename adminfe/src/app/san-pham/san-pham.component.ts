import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DanhMuc } from 'src/entity/DanhMuc.model';
import { SanPham } from 'src/entity/SanPham.model';
import { ThuongHieu } from 'src/entity/ThuongHieu';
import { DanhMucService } from 'src/services/danh-muc.service';
import { SanPhamService } from 'src/services/san-pham.service';
import { ThuongHieuService } from 'src/services/thuong-hieu.service';

@Component({
  selector: 'app-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.css']
})
export class SanPhamComponent implements OnInit {

  searchForm!: FormGroup;
  productForm!: FormGroup;
  isVisible = false;
  total = 1;
  loading = true;
  pageSize = 5;
  imageUrl: string = "";
  pageIndex = 1;
  listOfData: SanPham[] = [];
  listOfCategory: DanhMuc[] = [];
  listOfBrand: ThuongHieu[] = [];
  product = new SanPham();
  isEdit = false;
  isInsert = false;
  isView = false;
  controlArray: Map<string, any> = new Map<string, any>();
  imageProduct: string = "";
  fileToUpload: any;

  constructor(
    private fb: FormBuilder,
    private productService: SanPhamService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private categoryService: DanhMucService,
    private brandService: ThuongHieuService,
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
  showModal(id : any, action : any): void {
    this.isVisible = true;
    if (action == 'VIEW') {
      this.isView = true;
      this.isEdit = false;
      this.isInsert = false;

      this.listOfData.forEach((item) => {
        if (item.productID == id) {
          this.productForm.controls.productID.setValue(item.productID);
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
            item.cauHinh
          );
          this.productForm.controls.productQuantily.setValue(
            item.cauHinh
          );
          this.productForm.controls.productDimensions.setValue(
            item.cauHinh
          );
          this.productForm.controls.productWeight.setValue(item.cauHinh);
          this.productForm.controls.productMaterial.setValue(
            item.cauHinh
          );
        }
      });
    }
    if (action == 'EDIT') {
      this.isEdit = true;
      this.isInsert = false;
      this.isView = false;
      this.listOfData.forEach((item) => {
        if (item.productID == id) {
          this.productForm.controls.productID.setValue(item.productID);
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
            item.cauHinh
          );
          this.productForm.controls.productQuantily.setValue(
            item.cauHinh
          );
          this.productForm.controls.productDimensions.setValue(
            item.cauHinh
          );
          this.productForm.controls.productWeight.setValue(item.cauHinh);
          this.productForm.controls.productMaterial.setValue(
            item.cauHinh
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
    this.product.productID = this.productForm.controls.productID.value;
    this.product.tenSanPham = this.productForm.controls.productName.value;
    this.product.danhMuc =  this.productForm.controls.category1.value;

    this.product.nhanHieu = this.productForm.controls.brand1.value;

    this.product.anh1 = this.imageProduct;
    this.product.chiTiet =
      this.productForm.controls.productImportPrice.value;
    this.product.cauHinh =
      this.productForm.controls.productDescription.value;
    this.product.gia = this.productForm.controls.productPrice.value;
    this.product.soLuong =
      this.productForm.controls.productQuantily.value;
    this.product.cauHinh =
      this.productForm.controls.productDimensions.value;
    this.product.cauHinh = this.productForm.controls.productWeight.value;
    this.product.cauHinh =
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
                    'C?? l???i x???y ra!',
                    'Vui l??ng li??n h??? qu???n tr??? vi??n.'
                  );
                }
              );
          }
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
    this.controlArray.set('pageIndex', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortField', sortField);
    this.controlArray.set('sortOrder', sortOrder);
    // get product
    this.productService.getProduct(this.controlArray).subscribe(
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

  delProduct(id : any) {
    this.modal.confirm({
      nzTitle: 'B???n c?? ch???c ch???n mu???n x??a?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.productService.deleteProduct(id).subscribe(
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
            this.getProducts(this.pageIndex, this.pageSize, null, null);
          }
        ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfCategory = data.result;
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
  getBrands() {
    this.brandService.getAll().subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfBrand = data.result;
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
  onFileImageSelect(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);
    if (!this.checkImgUpload(this.fileToUpload.name)) {
      this.createNotification(
        'warning',
        'File kh??ng h???p l???!',
        'Vui l??ng ch???n l???i file h???p l???.'
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
