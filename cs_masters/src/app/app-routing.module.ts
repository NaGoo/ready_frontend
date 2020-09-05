import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMasterComponent } from './client-master/client-master.component';


const routes: Routes = [{path:'client',component:ClientMasterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
