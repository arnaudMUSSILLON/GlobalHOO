import { NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImageOptionsPage } from './image-options.page';
// import { Tab2PageModule } from '../tab2/tab2.module';

const routes: Routes = [
  {
    path: '',
    component: ImageOptionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ImageOptionsPage,
    // Tab2PageModule
  ]
})
export class ImageOptionsPageModule implements AfterViewInit {
  // @ViewChild( Tab2PageModule ) view;
  photo: any;

  ngAfterViewInit() {
    console.log('hey');
    // this.photo = this.view.base64Image;
  }
}
