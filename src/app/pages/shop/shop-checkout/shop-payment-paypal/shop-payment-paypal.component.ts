import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {PacifistaPaymentRequestDTO, PacifistaPaymentService} from "@funixproductions/funixproductions-requests";
import ShopService from "../../shop-service";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'app-shop-payment-paypal',
    templateUrl: './shop-payment-paypal.component.html',
    styleUrl: './shop-payment-paypal.component.scss',
    standalone: false
})
export class ShopPaymentPaypalComponent {

  private readonly paymentService: PacifistaPaymentService;
  private readonly window?: (WindowProxy & typeof globalThis) | null;

  loading = false;

  constructor(protected shopService: ShopService,
              protected notificationService: NotificationService,
              httpClient: HttpClient,
              @Inject(PLATFORM_ID) private platformId: object,
              @Inject(DOCUMENT) private document: Document) {
    this.paymentService = new PacifistaPaymentService(httpClient, environment.production);
    if (isPlatformBrowser(this.platformId)) {
      this.window = document.defaultView
    }
  }

  createOrder(): void {
    if (this.shopService.totalArticlesInBasket() === 0) {
        this.notificationService.info("Votre panier est vide. Veuillez ajouter des articles avant de procéder au paiement.", "Paiement");
        return;
    }

    const request = new PacifistaPaymentRequestDTO();
    request.articles = this.shopService.createArticlesRequestList();

    this.loading = true;
    this.paymentService.createOrder(request).subscribe({
      next: (response) => {
        const redirectUrl: string | undefined = response.urlClientRedirection;

        if (redirectUrl) {
          if (this.window) {
            window.location.href = redirectUrl;
          }
        } else {
          this.notificationService.error("Erreur lors de la création de la commande. Veuillez envoyer un mail à contact@pacifista.fr", "Paiement");
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.onErrorRequest(error);
      }
    });
  }

}
