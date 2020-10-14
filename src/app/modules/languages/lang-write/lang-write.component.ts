import { Component, OnInit } from '@angular/core';
import { Language, ILanguage } from './../language.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingOverlayService } from '@common/components/loading-overlay/loading-overlay.service';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import { LanguagesService } from '../languages.service';
import { CountryService } from 'app/modules/country/country.service';
import { switchMap, filter, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToasterService } from '@core/services/toaster.service';

@Component({
  selector: 'app-lang-write',
  templateUrl: './lang-write.component.html',
  styleUrls: ['./lang-write.component.scss'],
})
export class LangWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;
  countries = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private langSvc: LanguagesService,
    private countrySvc: CountryService,
    private formBuilder: FormBuilder,
  ) {}

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  countryItems() {
    return this.countrySvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  langItem({ id }) {
    return this.langSvc.item({ id }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  ngOnInit(): void {
    //+
    this.form = this.createForm(new Language());
    // obtenemos los paises
    this.countryItems()
      .pipe(
        switchMap((countries) => {
          this.countries = countries;
          // obtenemos el parametro
          return this.routeparam({ key: 'id' });
        }),
        // filtramos que no sea new
        filter((paramId) => paramId != 'new'),
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          // consultamos el lenguage
          return this.langItem({ id: paramId });
        })
      )
      .subscribe((lang: ILanguage) => {
        this.form = this.createForm(lang);
      });
  }

  createForm(model: Language): FormGroup {
    return this.formBuilder.group({
      langId: [
        model.langId,
        Validators.compose([MyValidator.required, MyValidator.minLength(1), MyValidator.maxLength(2)]),
      ],
      name: [model.name, Validators.compose([MyValidator.required, MyValidator.minLength(1)])],
      countryId: [model.countryId, Validators.compose([MyValidator.required])],
      testing: [model.testing],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.langSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/languages']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.langSvc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/languages']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/languages']);
  }
}
