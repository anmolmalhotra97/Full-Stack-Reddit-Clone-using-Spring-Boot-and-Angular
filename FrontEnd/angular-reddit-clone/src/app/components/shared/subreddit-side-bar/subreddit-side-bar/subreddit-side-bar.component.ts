import { Component, OnInit } from '@angular/core';
import { SubredditModel } from 'src/app/services/subreddit/subreddit-response';
import { SubredditService } from 'src/app/services/subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: Array<SubredditModel>;
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(response => {
      // We will have trouble showing all subreddits if there is a huge number of them
      // hence we only show 4 subreddits at the start and show a button to view all if needed
      if (response.length >= 4) {
        this.subreddits = response.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = response;
      }
    })
  }

  ngOnInit(): void {
  }

}
