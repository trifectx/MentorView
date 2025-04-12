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

import { requireAuth, redirectIfAuthenticated } from './guards/route.guard';

export const routes: Routes = [

    // 🟢 Public routes
    { path: '', component: HomeComponent, canActivate: [redirectIfAuthenticated] },
    { path: 'login', component: LoginComponent, canActivate: [redirectIfAuthenticated] }, 
    { path: 'sign-up', component: SignupComponent, canActivate: [redirectIfAuthenticated] }, 

    // 🔒 Protected routes
    { path: 'dashboard', component: DashboardComponent, canActivate: [requireAuth] },
    { path: 'interview', component: InterviewComponent, canActivate: [requireAuth] },
    { path: 'saved-interviews', component: SavedInterviewsComponent, canActivate: [requireAuth] },
    { path: 'overview', component: OverviewComponent, canActivate: [requireAuth] },
    { path: 'friends', component: FriendsComponent, canActivate: [requireAuth] },
    { path: 'assessment-centre', component: AssessmentCentreComponent, canActivate: [requireAuth] },

    // 🔴 Non-existant routes
    { path: '**', component: ErrorComponent },
];
