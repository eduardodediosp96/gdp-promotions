import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TablePaginationComponent } from '@core/components/table/table-pagination/table-pagination.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITransCountry, TransCountry } from '../transalting-countries-list/translating-countries.interface';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import { LanguagesService } from 'app/modules/languages/languages.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { CountryService } from 'app/modules/country/country.service';
import { TranslatingCountriesService } from '../translating-countries.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-translating-countries-write',
  templateUrl: './translating-countries-write.component.html',
  styleUrls: ['./translating-countries-write.component.scss'],
})
export class TranslatingCountriesWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;
  countries = [];
  languages = [];
  langId;
  constructor(
    public dialogRef: MatDialogRef<TranslatingCountriesWriteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private langSvc: LanguagesService,
    private countrySvc: CountryService,
    private tansCountrySvc: TranslatingCountriesService
  ) {}

  ngOnInit(): void {
    //+
    this.form = this.createForm(new TransCountry());
    this.data = this.data || {};
    // paises
    this.countryItems()
      .pipe(
        switchMap((countries) => {
          this.countries = countries;
          return this.langItems();
        }),
        switchMap((languages) => {
          this.languages = languages;
          this.langId = this.data.langId;
          this.form.controls.langId.setValue(this.langId);
          return of({ countryId: this.data.countryId, langId: this.data.langId });
        }),
        filter((item) => item.countryId && item.langId),
        switchMap((item) => {
          this.pageType = 'upd';
          return this.itemTRanslateCountry(item);
        })
      )
      .subscribe((item) => {
        this.form = this.createForm(item);
      });
  }

  createForm(model: ITransCountry): FormGroup {
    return this.formBuilder.group({
      countryId: [
        model.countryId,
        Validators.compose([MyValidator.required, MyValidator.minLength(1), MyValidator.maxLength(5)]),
      ],
      langId: [model.langId, Validators.compose([MyValidator.required])],
      name: [model.name, Validators.compose([MyValidator.required])],
    });
  }

  langItems() {
    return this.langSvc.items({}).pipe(
      map((result) => {
        return result.data.items;
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

  itemTRanslateCountry({ countryId, langId }) {
    return this.tansCountrySvc.item({ countryId, langId }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.tansCountrySvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.dialogRef.close(data);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.tansCountrySvc
      .updItem({
        countryId: this.data.countryId,
        langId: this.data.langId,
        body: data,
      })
      .subscribe((result) => {
        this.dialogRef.close(data);
      });
  }

  handleCancel(): void {
  }
}
