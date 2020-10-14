import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { LanguagesService } from '../languages/languages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-translating-countries',
  templateUrl: './translating-countries.component.html',
  styleUrls: ['./translating-countries.component.scss'],
})
export class TranslatingCountriesComponent implements OnInit {
  navLinks = [];
  currentLang = '';
  baseUrl = '/translating-countries/';
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
      map((result) => {
        return result.data.items;
      })
    );
  }
}
