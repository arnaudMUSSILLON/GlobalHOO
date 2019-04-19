import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { GalleryComponent } from '../components/gallery/gallery.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
  ],
  declarations: [
    Tab2Page,
    GalleryComponent
  ]
})
export class Tab2PageModule implements AfterViewInit {
  @ViewChild(GalleryComponent) gallery;
  mainPhoto: any;

  ngAfterViewInit() {
    this.mainPhoto = this.gallery.selectedPhoto;
  }
}
