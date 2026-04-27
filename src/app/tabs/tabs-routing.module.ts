import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'jamu',
        loadChildren: () => import('../jamu/jamu.module').then(m => m.JamuPageModule)
      },
      {
        path: 'resep',
        loadChildren: () => import('../resep/resep.module').then(m => m.ResepPageModule)
      },
      {
        path: 'pengingat',
        loadChildren: () => import('../pengingat/pengingat.module').then(m => m.PengingatPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
