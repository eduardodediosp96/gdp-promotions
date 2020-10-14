import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatingCurrenciesService } from './translating-currencies.service';
import { map } from 'rxjs/operators';
import { LanguagesService } from '../languages/languages.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-translating-currencies',
  templateUrl: './translating-currencies.component.html',
  styleUrls: ['./translating-currencies.component.scss'],
})
export class TranslatingCurrenciesComponent implements OnInit {
  navLinks = [];
  currentLang = '';
  baseUrl = '/translating-currencies/';
  constructor(
    private location: Location,
    private langSvc: LanguagesService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.currentLang = this.location.path().split('/')[2];
  }

  ngOnInit(): void {
    this.langItems().subscribe((items) => {
      this.navLinks = items.map((item) => {
        return {
          label: item.name.toLocaleUpperCase(),
          link: `${this.baseUrl}${item.langId}`,
        };
      });
      if (!this.navLinks.length) return;
      const link = this.currentLang ? `${this.baseUrl}${this.currentLang}` : this.navLinks[0].link;
      this.router.navigate([link]);
    });
  }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  langItems() {
    return this.langSvc.items({}).pipe(
      map((result: any) => {
        return result.data.items;
      })
    );
  }
}
