import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './shared/register/register.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'list-products',
    component: ListProductsComponent
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
  },
  {
    path: 'history',
    component: HistoryComponent,
  }
];
