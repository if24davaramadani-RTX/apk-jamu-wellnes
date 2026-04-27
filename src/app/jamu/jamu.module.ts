import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JamuPageRoutingModule } from './jamu-routing.module';

import { JamuPage } from './jamu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JamuPageRoutingModule
  ],
  declarations: [JamuPage]
})
export class JamuPageModule {}
