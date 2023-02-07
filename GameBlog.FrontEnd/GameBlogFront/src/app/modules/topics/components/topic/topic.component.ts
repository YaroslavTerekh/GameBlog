import { NewsService } from './../../../../core/services/news.service';
import { Topic } from './../../../../shared/models/topic';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  @Input()
  public topic!: Topic;
  public topicImage!: any;

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    // console.log(this.topic.image);
    if(this.topic.image) {      
      this.newsService.getImage(this.topic.image.id)
        .subscribe({
          next: res => {
            this.createImageFromBlob(res);
          }
        })
    }
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.topicImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
