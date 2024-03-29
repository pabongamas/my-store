import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes,PreloadAllModules } from '@angular/router'


import { NotFoundComponent } from './not-found/not-found.component';
import {CustomPreloadService} from './services/custom-preload.service';
import {QuicklinkModule} from 'ngx-quicklink'

import {AdminGuard} from './guards/admin.guard'


const routes: Routes = [
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  {
    path:'cms',
    canActivate:[AdminGuard],
    loadChildren:()=>import('./cms/cms.module').then(m=>m.CmsModule),
    data: {
      preload: true,
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
