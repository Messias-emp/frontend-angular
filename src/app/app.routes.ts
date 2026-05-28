import { Routes } from '@angular/router';

import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

import { productsResolver } from './store/resolvers/products.resolver';
import { productDetailResolver } from './store/resolvers/product-detail.resolver';

import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { PublicLayoutComponent } from './public/layout/public-layout.component/public-layout-component';
import { Home } from './shared/components/home/home';



export const routes: Routes = [

  // =====================================================
  // 🌎 ÁREA PÚBLICA (LOJA)
  // =====================================================
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
  path: '',
  component: Home,
  resolve: {
    products: productsResolver
  }
},

      // 🏠 Home (lista produtos)
      {
        path: '',
        loadComponent: () =>
          import('./store/product-list/product-list.component')
            .then(m => m.ProductListComponent),
        resolve: {
          products: productsResolver
        }
      },

      // 🔍 Detalhe do Produto
      {
        path: 'produto/:id',
        loadComponent: () =>
          import('./store/product-details/product-details.component')
            .then(m => m.ProductDetailComponent),
        resolve: {
          product: productDetailResolver
        }
      },

      // 🔐 Login
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component')
            .then(m => m.LoginComponent)
      },

      //Register de users
      {
      path: 'register',
      loadComponent: () =>
        import('./auth/register/register.component')
          .then(m => m.RegisterComponent)
       },

      // 🛒 Carrinho
      {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart.component')
            .then(m => m.CartComponent),
        canActivate: [authGuard]
      },

      // 💳 Checkout
      {
        path: 'checkout',
        loadComponent: () =>
          import('./checkout/checkout.component')
            .then(m => m.CheckoutComponent),
        canActivate: [authGuard]
      },

      // 📦 Meus Pedidos
      {
  path: 'meus-pedidos',
  children: [
    {
      path: '',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./orders/my-orders/my-orders.component')
          .then(m => m.MyOrdersComponent)
    },
    {
      path: ':id',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./orders/order-details/order-details.component')
          .then(m => m.OrderDetailsComponent)
    }
  ]
},
 



    ]
  },


  // =====================================================
  // 🔐 ÁREA ADMIN (BACKOFFICE)
  // =====================================================

      {
  path: 'admin',
  component: AdminLayoutComponent,
  canActivate: [adminGuard],
  canActivateChild: [adminGuard], // 🔥 ESSA LINHA RESOLVE TUDO
  children: [

      // 📊 Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent)
      },

      // 📦 Lista Produtos (Admin)
      {
        path: 'products',
        loadComponent: () =>
          import('./admin/products-admin/products-admin.component')
            .then(m => m.ProductsAdminComponent)
      },

      // ➕ Novo Produto
      {
        path: 'products/new',
        loadComponent: () =>
          import('./admin/product-form/product-form.component')
            .then(m => m.ProductFormComponent)
      },

      // ✏️ Editar Produto
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./admin/product-form/product-form.component')
            .then(m => m.ProductFormComponent)
      },

      // 🔁 Redireciona /admin → /admin/dashboard
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }

    ]
  },


  // =====================================================
  // 🚫 ROTA NÃO ENCONTRADA
  // =====================================================
  {
    path: '**',
    redirectTo: ''
  }

];
