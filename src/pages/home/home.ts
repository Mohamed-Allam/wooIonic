import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import * as WC from "woocommerce-api"
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  woocommerce: any;
  products: any[];
  page: number = 1;
  moreProducts: any[] = [];


  @ViewChild("productSlides") productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl:ToastController) {

    var thisObject = this;

    this.woocommerce = WC({
      url: "http://centstechnology.com/",
      consumerKey: "ck_a63f4e6cfc8d5a17d6de5a71fd6dfa1f74e6ac69",
      consumerSecret: "cs_f446377fd510d767d5fdc4a31ae7c9fd8180bafa",
      wpAPI: true,
      version: 'wc/v1'
    });
    console.log("==================================== Constructor");
    /* this.woocommerce.get('products', function(err, data, res) {
       console.log(data);
       console.log(res);
     });*/

    this.loadMoreProducts(null);
    this.woocommerce.getAsync('products').then(function (data) {
      // console.log(JSON.parse(data.body));
      console.log("============= initial call");
      thisObject.products = JSON.parse(data.body);
            // console.log(thisObject.products[0]);
    }, function (error) {
      console.log(error);
    });

  }

  ionViewDidLoad() {

    setInterval(() => {
      if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();

    }, 3000)
  }

  loadMoreProducts(event) {

    var thisObject = this;
  

    this.woocommerce.getAsync('products?page=' + this.page).then(function (data) {
       console.log("Load More Products.");
       thisObject.moreProducts = thisObject.moreProducts.concat(JSON.parse(data.body));
      console.log(thisObject.moreProducts);
      // console.log(thisObject.products[0]);
      thisObject.page++;
      if(event != null){
        event.complete();
      }

      if(JSON.parse(data.body).length < 10)
      {
        event.enable(false);
        thisObject.toastCtrl.create({
          message : " No More Products ",
          duration : 5000
        }).present();
      }

    }, function (error) {
      console.log(error);
    });

  }

  goProductDetails(product){

    this.navCtrl.push(ProductDetailsPage,{"product":product});
    
  }
}
