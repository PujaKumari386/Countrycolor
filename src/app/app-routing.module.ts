import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapcolorComponent } from './mapcolor/mapcolor.component';

const routes: Routes = [
  {path: "", component: MapcolorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
