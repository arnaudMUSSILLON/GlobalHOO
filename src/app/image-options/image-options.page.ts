import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-image-options',
  templateUrl: './image-options.page.html',
  styleUrls: ['./image-options.page.scss'],
})
export class ImageOptionsPage implements OnInit {
  private photo;

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.photo = this.router.getCurrentNavigation().extras.state.photo;
      }
    });
  }

  ngOnInit() {
  }

}
