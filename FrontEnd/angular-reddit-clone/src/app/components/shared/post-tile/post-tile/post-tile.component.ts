import { Component, OnInit } from '@angular/core';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from 'src/app/services/post/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  faComments = faComments;

  posts$: Array<PostModel> = [];

  constructor(private PostService: PostService) {
    this.PostService.getAllPosts().subscribe(post => {
      this.posts$ = post;
    })
  }

  ngOnInit(): void {
  }

  upvotePost() {

  }

  downvotePost() {

  }

  goToPost(postId: number) {

  }
}
