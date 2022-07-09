import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsPayload } from 'src/app/services/comment/comment.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostModel } from 'src/app/services/post/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  posts: PostModel[];
  comments: CommentsPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService) {

    this.name = this.activatedRoute.snapshot.params['name'];

    this.postService.getAllPostsByUser(this.name).subscribe(response => {
      this.posts = response;
      this.postLength = response.length;
    });

    this.commentService.getAllCommentsByUser(this.name).subscribe(response => {
      this.comments = response;
      this.commentLength = response.length;
    })
  }

  ngOnInit(): void {
  }

}
