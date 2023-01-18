import { AddPost } from './../interfaces/addPost';
import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Post } from "src/app/shared/models/post";
import { Topic } from 'src/app/shared/models/topic';
import { Journalist } from 'src/app/shared/models/journalist';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public addImage(data: any): Observable<string> {
    return this.http.post<string>(`${environment.apiAddress}/posts/add/image`, data);
  }

  public getImage(id: string): Observable<Blob> {
    return this.http.get(`${environment.apiAddress}/posts/image/${id}`, {
      responseType: 'blob',
    });
  }

  public addPost(post: AddPost, id: string): Observable<any> {
    return this.http.post(`${environment.apiAddress}/posts/${id}`, post);
  }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiAddress}/posts`);
  }

  public getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiAddress}/posts/${id}`);
  }

  public getNewPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiAddress}/posts/popular`);
  }

  public getMinePosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiAddress}/posts/mine`);
  }

  public getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.apiAddress}/posts/topics`);
  }

  public getTopicPosts(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiAddress}/posts/topic/${id}/posts`);
  }

  public getAllJournalists(): Observable<Journalist[]> {
    return this.http.get<Journalist[]>(`${environment.apiAddress}/posts/journalists/all`);
  }

  public getPopularJournalists(): Observable<Journalist[]> {
    return this.http.get<Journalist[]>(`${environment.apiAddress}/posts/journalists/popular`);
  }
}


