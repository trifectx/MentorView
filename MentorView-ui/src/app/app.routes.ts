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
import { ForumComponent } from './pages/forum/forum.component';
import { PostDetailComponent } from './pages/forum/post-detail/post-detail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home', 
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
    },
    {
        path: 'sign-up',
        component: SignupComponent,
        title: 'Sign Up',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
    },
    {
        path: 'interview',
        component: InterviewComponent,
        title: 'Your Interview',
    },
    {
        path: 'saved-interviews',
        component: SavedInterviewsComponent,
        title: 'Saved Interviews',
    },
    {
        path: 'overview',
        component: OverviewComponent,
        title: 'Performance Overview',
    },
    {
        path: 'friends',
        component: FriendsComponent,
        title: 'Friends',
    },
    {
        path: 'assessment-centre',
        component: AssessmentCentreComponent,
        title: 'Assessment Centre',
    },
    {
        path: 'forum',
        component: ForumComponent,
        title: 'Community Forum',
    },
    {
        path: 'forum/:id',
        component: PostDetailComponent,
        title: 'Forum Post',
    },
    {
        path: '**',
        component: ErrorComponent,
        title: 'Error',
    },
];
