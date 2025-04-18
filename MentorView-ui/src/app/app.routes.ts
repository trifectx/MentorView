import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InterviewComponent } from './pages/interview/interview.component';
import { SavedInterviewsComponent } from './pages/saved-interviews/saved-interviews.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { AssessmentCentreComponent } from './pages/assessment-centre/assessment-centre.component';
import { PostDetailComponent } from './pages/forum/post-detail/post-detail.component';
import { CommunityListComponent } from './pages/forum/community-list/community-list.component';
import { CommunityDetailComponent } from './pages/forum/community-detail/community-detail.component';
import { ForYouComponent } from './pages/forum/for-you/for-you.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';

import { requireAuth, redirectIfAuthenticated } from './guards/route.guard';

export const routes: Routes = [

    // 🟢 Public routes
    { path: '', component: HomeComponent, canActivate: [redirectIfAuthenticated] },
    { path: 'login', component: LoginComponent, canActivate: [redirectIfAuthenticated] }, 
    { path: 'sign-up', component: SignupComponent, canActivate: [redirectIfAuthenticated] }, 

    // 🔒 Protected routes
    { path: 'dashboard', component: DashboardComponent, canActivate: [requireAuth], title: 'Dashboard' },
    { path: 'interview', component: InterviewComponent, canActivate: [requireAuth], title: 'Online Interview' },
    { path: 'saved-interviews', component: SavedInterviewsComponent, canActivate: [requireAuth], title: 'Saved Interviews' },
    { path: 'overview', component: OverviewComponent, canActivate: [requireAuth], title: 'Overview' },
    { path: 'friends', component: FriendsComponent, canActivate: [requireAuth], title: 'Friends' },
    { path: 'assessment-centre', component: AssessmentCentreComponent, canActivate: [requireAuth], title: 'Assessment Centre' },
    { path: 'forum', component: ForYouComponent, canActivate: [requireAuth], title: 'For You' },
    { path: 'forum/communities', component: ForYouComponent, canActivate: [requireAuth], title: 'Communities' },
    { path: 'forum/community/:id', component: CommunityDetailComponent, canActivate: [requireAuth], title: 'Community' },
    { path: 'forum/post/:id', component: PostDetailComponent, canActivate: [requireAuth], title: 'Forum Post' },
    { path: 'leaderboard', component: LeaderboardComponent, canActivate: [requireAuth], title: 'XP Leaderboard' },

    // 🔴 Non-existant routes
    { path: '**', component: ErrorComponent },
];
