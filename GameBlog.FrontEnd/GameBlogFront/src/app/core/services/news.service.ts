import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Post } from "src/app/shared/models/post";
import { Topic } from 'src/app/shared/models/topic';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiAddress}/posts`);
  }

  public getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiAddress}/posts/${id}`);
  }

  public getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.apiAddress}/posts/topics`);
  }

  public getTopicPosts(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiAddress}/posts/topic/${id}/posts`);
  }
}


