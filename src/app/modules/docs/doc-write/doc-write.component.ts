import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsService } from '../docs.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { IDoc, Doc } from '../docs.interface';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';

@Component({
  selector: 'app-doc-write',
  templateUrl: './doc-write.component.html',
  styleUrls: ['./doc-write.component.scss']
})
export class DocWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private docSvc: DocsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    //+
    this.form = this.createForm(new Doc());
    // obtenemos
    this.routeparam({ key: 'id' })
      .pipe(
        // filtramos que no sea new
        filter((paramId) => paramId != 'new'),
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          // consultamos el lenguage
          return this.callingCodeItem({ id: paramId });
        })
      )
      .subscribe((doc: IDoc) => {
        this.form = this.createForm(new Doc(doc));
      });
  }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  callingCodeItem({ id }) {
    return this.docSvc.item({ id }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  createForm(model: Doc): FormGroup {
    return this.formBuilder.group({
      docId: [model.docId, Validators.compose( [ MyValidator.required, MyValidator.minLength(1) ] ) ],
      description: [model.description, Validators.compose( [ MyValidator.required, MyValidator.minLength(1) ] ) ],
      testing: [model.testing],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.docSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/docs']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.docSvc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/docs']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/docs']);
  }

}
