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
        path: '**',
        component: ErrorComponent,
        title: 'Error',
    },
];
