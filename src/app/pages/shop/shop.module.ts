import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopCategoriesComponent } from './shop-categories/shop-categories.component';
import { ShopArticlesComponent } from './shop-articles/shop-articles.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ShopArticleComponent } from './shop-articles/shop-article/shop-article.component';
import { ShopArticleModalComponent } from './shop-articles/shop-article-modal/shop-article-modal.component';
import { ShopCheckoutComponent } from './shop-checkout/shop-checkout.component';
import { ShopBasketLittleComponent } from './shop-basket-little/shop-basket-little.component';


@NgModule({
  declarations: [
    ShopComponent,
    ShopCategoriesComponent,
    ShopArticlesComponent,
    ShopArticleComponent,
    ShopArticleModalComponent,
    ShopCheckoutComponent,
    ShopBasketLittleComponent
  ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        FontAwesomeModule
    ]
})
export class ShopModule { }
