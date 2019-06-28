import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.page.html',
  styleUrls: ['./image-detail.page.scss'],
})
export class ImageDetailPage implements OnInit {
  image: string;
  imageData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {    // Get data from previous page
      if (this.router.getCurrentNavigation().extras.state) {
        this.image = 'data:image/jpeg;base64,'+this.router.getCurrentNavigation().extras.state.image;
        this.imageData = this.router.getCurrentNavigation().extras.state.imagedata;
      }
    });
  }

  ngOnInit() {
    if(this.image == undefined || this.imageData == undefined) 
      this.router.navigateByUrl('/app/tabs/tab1');    //Redirect if empty
    else
      (this.imageData.stranding === true)? this.imageData.stranding = 'yes' :  this.imageData.stranding = 'no';   //display
  }
}
