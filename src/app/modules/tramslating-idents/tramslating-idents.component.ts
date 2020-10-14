import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguagesService } from '../languages/languages.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tramslating-idents',
  templateUrl: './tramslating-idents.component.html',
  styleUrls: ['./tramslating-idents.component.scss'],
})
export class TramslatingIdentsComponent implements OnInit {
  navLinks = [];
  currentLang = '';
  baseUrl = '/translating-idents/';
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
