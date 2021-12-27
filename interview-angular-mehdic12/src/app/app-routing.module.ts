import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { NearestComponent } from './nearest/nearest.component';

const routes: Routes = [
   { path: 'api/cities', component: CitiesComponent }   ,
   { path: 'api/cities/nearest/:city', component: NearestComponent},  
 ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 