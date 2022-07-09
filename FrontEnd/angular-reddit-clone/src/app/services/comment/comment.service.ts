import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentsPayload[]> {
    return this.httpClient.get<CommentsPayload[]>('http://localhost:8080/api/comments/by-postId/' + postId);
  }

  postComment(commentPayload: CommentsPayload): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/comments/', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentsPayload[]>('http://localhost:8080/api/comments/by-user/' + name);
  }
}
