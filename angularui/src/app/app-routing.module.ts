import { AdminComponent } from './admin/admin.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';

const routes: Routes = [
  {
    path:"",
    component:MainLayoutComponent,
    children:[
      {
        path:'', redirectTo:'/authentication/signin', pathMatch: "full"
      },
      {
        path:'admin',
        component:AdminComponent
      }
    ]
  },
      { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
