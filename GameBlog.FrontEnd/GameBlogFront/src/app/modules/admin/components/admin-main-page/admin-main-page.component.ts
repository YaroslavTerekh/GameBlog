import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { AdminService } from './../../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss']
})
export class AdminMainPageComponent implements OnInit {

  public allUsers!: User[];

  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllUsers()
      .subscribe({
        next: res => {
          this.allUsers = res;
        }
      });

    this.adminService.getDataForChart()
      .subscribe({
        next: res => {
          this.initDiagram(res);  
        }
      })    
  }

  toggleModal(value: boolean): void {
    this.authService.showSendNotificationSubject.next(value);
  }

  createDate(num: number): string {
    let date = new Date(new Date().setDate(new Date().getDate() - num));
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();

    if (+month < 10) {
      month = `0${month}`;
    }

    if (+day < 10) {
      day = `0${day}`;
    }

    return `${day}.${month}`;
  }

  initDiagram(users: any): void {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [this.createDate(6), this.createDate(5), this.createDate(4), this.createDate(3), this.createDate(2), this.createDate(1), 'Сьогодні']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [users.day1.length, users.day2.length, users.day3.length, users.day4.length, users.day5.length, users.day6.length, users.day7.length],
          type: 'line',
          areaStyle: {}
        }
      ]
    };

    option && myChart.setOption(option);
  }

}
