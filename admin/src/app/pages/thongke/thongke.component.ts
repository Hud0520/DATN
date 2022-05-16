import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  Color,
} from 'ng2-charts';
import { BillService } from 'src/app/services/bill.service';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { StatisticService } from 'src/app/services/statistic.service';
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css'],
})
export class ThongkeComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
  };
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'];
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(0, 234, 211)',
      backgroundColor: 'rgba(40, 255, 191,0.3)',
    },
  ];
  public lineChartType = 'line';
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: Array<any> = [
    {
      backgroundColor: [
        '#00EAD3',
        '#FFF5B7',
        '#FF449F',
        '#005F99',
        '#FB3640',
        '#542E71',
        '#FDCA40',
        '#AA2EE6',
        '#005792',
        '#FFAAA7',
      ],
    },
  ];
  monday:Date;
  sunday:Date;
  month:Date = new Date();
  public pieChartLabels1: Label[] = [];
  public pieChartData1: SingleDataSet = [];
  public pieChartColors1: Array<any> = [
    {
      backgroundColor: [
        '#21E6C1',
        '#278EA5',
        '#1F4287',
        '#071E3D',
        '#F30A49',
        '#FDC57B',
      ],
    },
  ];
  controlArray: Map<string, any> = new Map<string, any>();
  controlArray1: Map<string, any> = new Map<string, any>();
  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private statisticService: StatisticService,
    private billService:BillService
  ) {
    this.getStaticBrand();
    this.getStaticCategory();
    this.getDate();
    this.getStaticBill();
  }
  userName = '';
  ngOnInit(): void {
    this.userName = localStorage.getItem('username') || '';

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  getStaticBrand() {
    this.brandService.getAllBrand().subscribe(
      (data) => {
        if (data && data.results) {
          data.results.forEach((ele) => {
            this.pieChartLabels.push(ele.brandName);
          });
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
    this.statisticService.getStatisticBrand(null).subscribe(
      (data) => {
        if (data && data.result) {
          this.pieChartData = data.result;
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
  getStaticCategory() {
    this.categoryService.getAllCategory().subscribe(
      (data) => {
        if (data && data.results) {
          data.results.forEach((ele) => {
            this.pieChartLabels1.push(ele.categoryName);
          });
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

    this.statisticService.getStatisticCategory(null).subscribe(
      (data) => {
        if (data && data.result) {
          this.pieChartData1 = data.result;
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
  getStaticBill() {
    this.statisticService.getStatisticBill(null).subscribe(
      (data) => {
        if (data && data.result) {
          const total= [{ data: data.result, label: 'Thu nhập tuần' }];
          this.lineChartData = total;
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
  getStaticBillThisWeek(){
    this.controlArray.set('fromDate', this.convertDate(this.monday));
    this.controlArray.set('toDate', this.convertDate(this.sunday));
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
  getStaticProduct(){
    this.controlArray1.set('inventory', true);
    this.statisticService.exportProducts(this.controlArray1).subscribe(
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
      date.getDate() +'/'+
      (date.getMonth()+ 1 ) +'/'+
      date.getFullYear() +
      '.xlsx';
    link.click();
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  getDate(){
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay() +1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    this.monday = new Date(curr.setDate(first));
    this.sunday = new Date(curr.setDate(last));
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
