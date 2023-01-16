import { Journalist } from './../../../../shared/models/journalist';
import { NewsService } from 'src/app/core/services/news.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journalists',
  templateUrl: './journalists.component.html',
  styleUrls: ['./journalists.component.scss']
})
export class JournalistsComponent implements OnInit {

  public journalists!: Journalist[];

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getAllJournalists()
      .subscribe({
        next: res => {
          this.journalists = res; 
        }
      });
  }

}
