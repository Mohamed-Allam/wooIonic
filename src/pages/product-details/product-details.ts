import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import * as WC from "woocommerce-api";
import { Storage } from "@ionic/storage";
import { CartPage } from '../cart/cart';


@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  woocommerce: any;
  reviews: any[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public toastCtrl:ToastController,
  public modalCtrl:ModalController) {
    this.product = this.navParams.get("product");
    console.log(this.product);

    let thisObject = this;

    this.woocommerce = WC({
      url: "https://centstechnology.com/",
      consumerKey: "ck_9231153d89e40dd9ba4236b2a2a8c72bb2e7763c",
      consumerSecret: "cs_4dbe4ba98444919a2857031acefcb88643c80743",
      wpAPI: true,
      version: 'wc/v2'
    });

    this.woocommerce.getAsync('products/' + this.product.id + '/reviews').then(function (data) {

      thisObject.reviews = JSON.parse(data.body);
      console.log(thisObject.reviews);
    }, function (error) {
      console.log(error);
    });
  }

  addToCart(product) {

    this.storage.get("cart").then((data) => {

      let added = false;
      console.log(data);
      if(data == null || data.length == 0){
        console.log(" New cart is created ! ");
        data = [];
        let item = {
          qty : 1,
          amount : parseFloat(product.price),
          product : product
        };
        data.push(item);
      }
      else{



        for(let i = 0; i < data.length ; i++){
          if(product.id == data[i].product.id){
            console.log(" Product found already ");
            data[i].qty++;
            data[i].amount += parseFloat(product.price);
            added = true;

          }
        }

        if(!added){
          let item = {
            qty : 1,
            amount : parseFloat(product.price),
            product : product
          };
          data.push(item);
        }
      }

      this.storage.set("cart",data);
      console.log("cart updated !");
      console.log(data);
      this.toastCtrl.create({
        message:"Cart Updated",
        duration : 3000
      }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

}
