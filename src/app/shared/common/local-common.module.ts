import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterOutletTabComponent } from './components/router-outlet-tab/router-outlet-tab.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmLogoutComponent } from './components/confirm-dialog/confirm-logout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CardListComponent } from './components/card-list/card-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementViewerComponent } from './components/element-viewer/element-viewer.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
// const routerChildren: Routes = [];
@NgModule({
  declarations: [
    TitleComponent,
    LogoComponent,
    RouterOutletTabComponent,
    LoadingComponent,
    LoadingOverlayComponent,
    ConfirmDialogComponent,
    ConfirmLogoutComponent,
    CardListComponent,
    ElementViewerComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ConfirmLogoutComponent,
  ],
  imports: [
    ScrollingModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
      preventDuplicates: true,
    }),
  ],
    exports: [TitleComponent, LogoComponent, RouterOutletTabComponent, CardListComponent, ElementViewerComponent],
})
export class LocalCommonModule {}
