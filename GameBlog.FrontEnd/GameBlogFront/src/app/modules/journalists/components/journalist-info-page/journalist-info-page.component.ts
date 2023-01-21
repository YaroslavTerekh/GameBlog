import { Journalist } from 'src/app/shared/models/journalist';
import { NewsService } from 'src/app/core/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journalist-info-page',
  templateUrl: './journalist-info-page.component.html',
  styleUrls: ['./journalist-info-page.component.scss']
})
export class JournalistInfoPageComponent implements OnInit {

  public id: string = this.route.snapshot.params['id'];
  public journalist!: Journalist;
  public journalistAvatar!: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getJournalist(this.id)
      .subscribe({
        next: res => {
          this.journalist = res;
          console.log(res);
          

          this.newsService.getImage(res.user.avatar.id)
            .subscribe({
              next: res => {
                this.createImageFromBlob(res);
              }
            })
        }
      });
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.journalistAvatar = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
