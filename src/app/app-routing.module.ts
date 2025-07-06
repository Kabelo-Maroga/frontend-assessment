import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/quotes', pathMatch: 'full' },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'quotes',
    loadChildren: () => import('./features/quotes/quote.module').then(m => m.QuoteModule)
  },
  { path: '**', redirectTo: '/quotes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
