import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import { Topic } from 'src/app/shared/models/topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  public topics!: Topic[];

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getAllTopics()
      .subscribe({
        next: res => {
          this.topics = res;
        }
      });
  }
}
