import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { ViewPostComponent } from './components/post/view-post/view-post.component';
import { CreateSubredditComponent } from './components/subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditComponent } from './components/subreddit/list-subreddit/list-subreddit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'list-subreddits', component: ListSubredditComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'create-subreddit', component: CreateSubredditComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
