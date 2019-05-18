import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NewpageComponent } from './newpage/newpage.component';

const routes: Routes = [
  {path: 'landing' , component: LandingComponent},
  {path: 'new' , component: NewpageComponent},
  {path: '**' , redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
