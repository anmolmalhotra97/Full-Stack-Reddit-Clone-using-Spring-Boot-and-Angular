import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private PostService: PostService, private router: Router) {
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

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
