import { NewsService } from 'src/app/core/services/news.service';
import { Journalist } from './../../../../shared/models/journalist';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-journalists',
  templateUrl: './top-journalists.component.html',
  styleUrls: ['./top-journalists.component.scss']
})
export class TopJournalistsComponent implements OnInit {

  public journalists!: Journalist[];

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getPopularJournalists()
      .subscribe({
        next: res => {
          this.journalists = res;
        }
      });
  }

}
