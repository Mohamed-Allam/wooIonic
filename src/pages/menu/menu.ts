import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from "woocommerce-api"
import { ProductsCateoryPage } from '../products-cateory/products-cateory';




@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  // rootPage: any = MenuPage;
  homePage: any;
  woocommerce : any;
  categories : any[] = [];
  temp : any[] = []
  @ViewChild("content2") childNavCtrl : NavController;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    

    console.log(" Menu Constructor ")
    
    this.homePage = HomePage;

    var thisObject = this;

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

     this.woocommerce.getAsync('products/categories').then(function (data) {
      
      thisObject.temp = JSON.parse(data.body);

      for(let i = 0 ; i < thisObject.temp.length ; i++){
        if(thisObject.temp[i].parent == 0)
        {
          if( ! thisObject.categories.find((c) =>{ return c.id == thisObject.temp[i].id }))
                thisObject.categories.push(thisObject.temp[i])
        
         }
    }
      
    console.log(" Categories === === === === === === === ");
    console.log(thisObject.categories);
    }, function (error) {
      console.log(error);
    });
  }

  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsCateoryPage,{"category" : category});
  // this.navCtrl.push(ProductsCateoryPage,{"category" : category});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
