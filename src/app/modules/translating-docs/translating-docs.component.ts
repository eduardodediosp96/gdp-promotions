import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LanguagesService } from '../languages/languages.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-translating-docs',
  templateUrl: './translating-docs.component.html',
  styleUrls: ['./translating-docs.component.scss'],
})
export class TranslatingDocsComponent implements OnInit {
  navLinks = [];
  baseUrl = '/translating-docs/lang/';
  currentLang = '';
  constructor(
    private langSvc: LanguagesService,
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute
  ) {
    this.currentLang = this.location.path().split('/')[3];
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
