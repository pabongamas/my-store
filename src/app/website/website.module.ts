import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
// import {QuicklinkModule} from 'ngx-quicklink'


import { NavComponent } from './components/nav/nav.component';

import { TimeInterceptor } from './../interceptors/time.interceptor';
import { TokenInterceptor } from './../interceptors/token.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';




import { WebsiteRoutingModule } from './website-routing.module';
import {SharedModule} from './../shared/shared.module';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    // QuicklinkModulek
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TimeInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}

  ],
})
export class WebsiteModule { }
