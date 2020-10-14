import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguagesService } from 'app/modules/languages/languages.service';
import { TranslatingKeysService } from '../translating-keys.service';
import { TransKey, ITransKey } from '../translating-keys.interface';
import { switchMap, filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';

@Component({
  selector: 'app-translating-keys-write',
  templateUrl: './translating-keys-write.component.html',
  styleUrls: ['./translating-keys-write.component.scss']
})
export class TranslatingKeysWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;
  languages = [];
  langId;
  constructor(
    public dialogRef: MatDialogRef<TranslatingKeysWriteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private langSvc: LanguagesService,
    private tanslatingKeysSvc: TranslatingKeysService
  ) { }

  ngOnInit(): void {
    //+
    this.form = this.createForm(new TransKey());
    this.data = this.data || {};
    // paises
    this.langItems()
      .pipe(
        switchMap((languages) => {
          this.languages = languages;
          this.langId = this.data.langId;
          this.form.controls.langId.setValue(this.langId);
          return of({ keyId: this.data.keyId, langId: this.data.langId });
        }),
        filter((item) => item.keyId && item.langId),
        switchMap((item) => {
          this.pageType = 'upd';
          return this.itemTranslateKey(item);
        })
      )
      .subscribe((item) => {
        this.form = this.createForm(item);
      });
  }

  createForm(model: ITransKey): FormGroup {
    return this.formBuilder.group({
      keyId: [
        model.keyId,
        Validators.compose([MyValidator.required, MyValidator.minLength(1)]),
      ],
      langId: [model.langId, Validators.compose([MyValidator.required])],
      value: [model.value, Validators.compose([MyValidator.required])],
    });
  }

  langItems() {
    return this.langSvc.items({}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  itemTranslateKey({ keyId, langId }) {
    return this.tanslatingKeysSvc.item({ keyId, langId }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.tanslatingKeysSvc
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
    this.tanslatingKeysSvc
      .updItem({
        keyId: this.data.keyId,
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
