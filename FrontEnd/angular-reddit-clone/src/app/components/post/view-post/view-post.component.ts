import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentsPayload } from 'src/app/services/comment/comment.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostModel } from 'src/app/services/post/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post: PostModel;

  commentForm: FormGroup;
  commentPayload: CommentsPayload;
  comments: CommentsPayload[];

  constructor(private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private router: Router) {

    this.postId = this.activateRoute.snapshot.params['id'];

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    }

    this.postService.getPost(this.postId).subscribe(response => {
      this.post = response;
    }, error => {
      throwError(error);
    })
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  getPostById() {
    this.postService.getPost(this.postId).subscribe(response => {
      this.post = response;
    }, error => {
      throwError(error);
    })
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postComment(this.commentPayload).subscribe(response => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(response => {
      this.comments = response;
    }, error => {
      throwError(error);
    })
  }
}
