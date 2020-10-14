import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentsService } from 'app/modules/idents/idents.service';
import { filter, switchMap, map } from 'rxjs/operators';
import { TranslatingDocsService } from '../translating-docs.service';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';
import { ITransDoc, TransDoc } from '../translating-docs.interface';
import { LanguagesService } from 'app/modules/languages/languages.service';

@Component({
  selector: 'app-translating-docs-write',
  templateUrl: './translating-docs-write.component.html',
  styleUrls: ['./translating-docs-write.component.scss'],
})
export class TranslatingDocsWriteComponent implements OnInit {
  docId;
  langId;
  pageType = 'new';
  form: FormGroup;
  languages = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private docsSvc: TranslatingDocsService,
    private formBuilder: FormBuilder,
    private langSvc: LanguagesService
  ) {}

  ngOnInit(): void {
    //+
    this.form = this.createForm(new TransDoc());
    // obtenemos los paises
    this.langItems()
      .pipe(
        switchMap((languages) => {
          this.languages = languages;
          return this.routeparams();
        }),
        filter((params) => {
          this.langId = params.langid;
          this.form.controls.langId.setValue(params.langid);
          return params.id != 'new';
        }),
        switchMap((params) => {
          this.pageType = 'upd';
          this.docId = params.id;
          return this.docItem({ docId: params.id, langId: params.langid });
        })
      )
      .subscribe((lang: ITransDoc) => {
        this.form = this.createForm(lang);
      });
  }

  routeparams() {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params;
      })
    );
  }

  docItem({ docId, langId }) {
    return this.docsSvc.item({ docId, langId }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  langItems() {
    return this.langSvc.items({loadingOverlay: false}).pipe(
      map((result) => {
        return result.data.items;
      })
    );
  }

  createForm(model: ITransDoc): FormGroup {
    return this.formBuilder.group({
      docId: [model.docId, Validators.compose([MyValidator.required, MyValidator.minLength(1)])],
      langId: [model.langId, Validators.compose([MyValidator.required])],
      value: [model.value, Validators.compose([MyValidator.required])],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.docsSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate([`/translating-docs/lang/${this.langId}`]);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    this.docsSvc
      .updItem({
        docId: this.docId,
        langId: this.langId,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate([`/translating-docs/lang/${this.langId}`]);
      });
  }

  handleCancel(): void {
    this.router.navigate([`/translating-docs/lang/${this.langId}`]);
  }
}
