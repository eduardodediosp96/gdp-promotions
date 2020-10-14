import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './modules/main.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', 		loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
      { path: 'languages', 		loadChildren: () => import('./modules/languages/languages.module').then((m) => m.LanguagesModule) },
      { path: 'country', loadChildren: () => import('./modules/country/country.module').then(m => m.CountryModule) },
      { path: 'promotion', loadChildren: () => import('./modules/promotion/promotion.module').then(m => m.promotionModule) },
      { path: 'template', loadChildren: () => import('./modules/templates/template.module').then(m => m.templateModule) },
      { path: 'currencies', loadChildren: () => import('./modules/currencies/currencies.module').then(m => m.CurrenciesModule) },
      { path: 'calling-codes', loadChildren: () => import('./modules/calling-codes/calling-codes.module').then(m => m.CallingCodesModule) },
      { path: 'country-currencies', loadChildren: () => import('./modules/country-currencies/country-currencies.module').then(m => m.CountryCurrenciesModule) },
      { path: 'idents', loadChildren: () => import('./modules/idents/idents.module').then(m => m.IdentsModule) },
      { path: 'docs', loadChildren: () => import('./modules/docs/docs.module').then(m => m.DocsModule) },
      { path: 'keys', loadChildren: () => import('./modules/keys/keys.module').then(m => m.KeysModule) },
      { path: 'country-idents', loadChildren: () => import('./modules/country-idents/country-idents.module').then(m => m.CountryIdentsModule) },
      { path: 'translating-countries', loadChildren: () => import('./modules/translating-countries/translating-countries.module').then(m => m.TranslatingCountriesModule) },
      { path: 'translating-currencies', loadChildren: () => import('./modules/translating-currencies/translating-currencies.module').then(m => m.TranslatingCurrenciesModule) },
      { path: 'translating-idents', loadChildren: () => import('./modules/tramslating-idents/tramslating-idents.module').then(m => m.TramslatingIdentsModule) },
      { path: 'translating-keys', loadChildren: () => import('./modules/translating-keys/translating-keys.module').then(m => m.TranslatingKeysModule) },
      { path: 'translating-docs', loadChildren: () => import('./modules/translating-docs/translating-docs.module').then(m => m.TranslatingDocsModule) },
    ],
  },
];
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
