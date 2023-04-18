import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  {
    path:'',
    loadChildren:()=>import('./website/website.module').then(m=>m.WebsiteModule)
  },
  {
    path:'cms',
    loadChildren:()=>import('./cms/cms.module').then(m=>m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
