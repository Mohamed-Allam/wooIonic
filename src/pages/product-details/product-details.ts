import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from  "woocommerce-api";

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product:any;
  woocommerce: any;
  reviews : any[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("product");
    console.log(this.product);

    let thisObject = this;

     this.woocommerce = WC({
      url: "http://centstechnology.com/",
      consumerKey: "ck_a63f4e6cfc8d5a17d6de5a71fd6dfa1f74e6ac69",
      consumerSecret: "cs_f446377fd510d767d5fdc4a31ae7c9fd8180bafa",
      wpAPI: true,
      version: 'wc/v1'
    });

    this.woocommerce.getAsync('products/'+this.product.id + '/reviews').then(function (data) {
      
      thisObject.reviews = JSON.parse(data.body);
      console.log(thisObject.reviews);
    }, function (error) {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
