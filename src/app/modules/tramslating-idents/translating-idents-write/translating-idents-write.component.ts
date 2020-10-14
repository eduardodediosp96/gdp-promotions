import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslatingIdentsService } from '../translating-idents.service';
import { CountryService } from 'app/modules/country/country.service';
import { LanguagesService } from 'app/modules/languages/languages.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap, filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransIdents, ITransIdents } from '../translating-idents.interface';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';

@Component({
  selector: 'app-translating-idents-write',
  templateUrl: './translating-idents-write.component.html',
  styleUrls: ['./translating-idents-write.component.scss']
})
export class TranslatingIdentsWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;
  languages = [];
  langId;
  constructor(
    public dialogRef: MatDialogRef<TranslatingIdentsWriteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private langSvc: LanguagesService,
    private tansIdentSvc: TranslatingIdentsService
  ) { }

  ngOnInit(): void {
    //+
    this.form = this.createForm(new TransIdents());
    this.data = this.data || {};
    // paises
    this.langItems()
      .pipe(
        switchMap((languages) => {
          this.languages = languages;
          this.langId = this.data.langId;
          this.form.controls.langId.setValue(this.langId);
          return of({ identId: this.data.identId, langId: this.data.langId });
        }),
        filter((item) => item.identId && item.langId),
        switchMap((item) => {
          this.pageType = 'upd';
          return this.itemTRanslateIdent(item);
        })
      )
      .subscribe((item) => {
        this.form = this.createForm(item);
      });
  }

  createForm(model: ITransIdents): FormGroup {
    return this.formBuilder.group({
      identId: [
        model.identId,
        Validators.compose([MyValidator.required, MyValidator.minLength(1), MyValidator.maxLength(5)]),
      ],
      langId: [model.langId, Validators.compose([MyValidator.required])],
      name: [model.name, Validators.compose([MyValidator.required])],
      description: [model.description, Validators.compose([MyValidator.required])],
    });
  }

  langItems() {
    return this.langSvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  itemTRanslateIdent({ identId, langId }) {
    return this.tansIdentSvc.item({ identId, langId }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.tansIdentSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.dialogRef.close(true);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.tansIdentSvc
      .updItem({
        identId: this.data.identId,
        langId: this.data.langId,
        body: data,
      })
      .subscribe((result) => {
        this.dialogRef.close(true);
      });
  }

  handleCancel(): void {
  }

}
