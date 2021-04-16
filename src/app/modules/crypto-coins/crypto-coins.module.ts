import { MailForwardingPresenter } from './presenter/crypto-coins.presenter';
import { CryptoCoinsService } from './crypto-coins.service';
import { LocalCommonModule } from '@common/local-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { cryptoCoinsRoutingModule } from './crypto-coins-routing.module';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoCoinsComponent } from './crypto-coins.component';
import { CryptoCoinViewerComponent } from './components/crypto-coin-viewer/crypto-coin-viewer.component';



@NgModule({
  declarations: [CryptoCoinsComponent, CryptoCoinViewerComponent],
  imports: [
    CommonModule,
    cryptoCoinsRoutingModule,
    LocalCommonModule,
    MatButtonModule
  ],
  providers: [CryptoCoinsService, MailForwardingPresenter]
})
export class cryptoCoinsModule { }
