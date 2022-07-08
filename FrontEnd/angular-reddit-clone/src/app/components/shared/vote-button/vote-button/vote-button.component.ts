import { Component, Input, OnInit } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from 'src/app/services/post/post-model';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  constructor() { }

  ngOnInit(): void {
  }

  downvotePost() {

  }

  upvotePost() {

  }
}
