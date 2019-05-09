import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-image-options',
  templateUrl: './image-options.page.html',
  styleUrls: ['./image-options.page.scss'],
})
export class ImageOptionsPage implements OnInit {
  private photo;

  constructor(private route: ActivatedRoute, private router: Router, private domSanitizer: DomSanitizer) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.photo = this.router.getCurrentNavigation().extras.state.photo;
      }
    });
  }

  ngOnInit() {
  }

  /**
   * Normalize the URL
   */
  getImgContent() {
    // return this.webview.convertFileSrc(this.photo);
    // return this.domSanitizer.bypassSecurityTrustResourceUrl(img);
  }
}
