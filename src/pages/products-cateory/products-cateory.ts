import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from "woocommerce-api"
import { ProductDetailsPage } from '../product-details/product-details';

/**
 * Generated class for the ProductsCateoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-products-cateory',
  templateUrl: 'products-cateory.html',
})
export class ProductsCateoryPage {

  woocommerce: any;
  products: any[];
  category: any;
  pageNumber: any = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController) {

    var thisObject = this;

    this.category = this.navParams.get("category");

    this.woocommerce = WC({
      url: "https://centstechnology.com/",
      consumerKey: "ck_9231153d89e40dd9ba4236b2a2a8c72bb2e7763c",
      consumerSecret: "cs_4dbe4ba98444919a2857031acefcb88643c80743",
      wpAPI: true,
      version: 'wc/v2'
    });

    /* this.woocommerce.get('products', function(err, data, res) {
       console.log(data);
       console.log(res);
     });*/

    this.woocommerce.getAsync('products?category=' + this.category.id).then(function (data) {


      thisObject.products = JSON.parse(data.body);
      console.log(thisObject.products);


    }, function (error) {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsCateoryPage');
  }

  loadMoreProducts(event) {

    let thisObject = this;
    this.pageNumber++;
    console.log("Getting page Number " + this.pageNumber);

    this.woocommerce.getAsync('products?category=' + this.category.id + "&page=" + this.pageNumber).then(function (data) {

      thisObject.products = thisObject.products.concat(JSON.parse(data.body));
      console.log(thisObject.products);
      event.complete();
      let temp = JSON.parse(data.body);
      if(temp.length <  10)
      {
        event.enable(false);
      }

      thisObject.toastCtrl.create({
        message : " No More Products ",
        duration : 5000
      }).present();

    }, function (error) {
      console.log(error);
    });

  }

  goProductDetails(product){

    this.navCtrl.push(ProductDetailsPage,{"product":product});
    
  }
}
