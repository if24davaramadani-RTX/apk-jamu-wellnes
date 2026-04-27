import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JamuPage } from './jamu.page';

const routes: Routes = [
  {
    path: '',
    component: JamuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JamuPageRoutingModule {}
