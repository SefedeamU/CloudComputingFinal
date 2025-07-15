import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './shared/register/register.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { PaymentComponent } from './pages/payment/payment.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'productos',
    component: ListProductsComponent
  },
  {
    path: 'pago',
    component: PaymentComponent
  }
];
