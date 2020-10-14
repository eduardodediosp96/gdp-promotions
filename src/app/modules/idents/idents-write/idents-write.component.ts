import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentsService } from '../idents.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { IIdents, Ident } from '../idents.interface';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';

@Component({
  selector: 'app-idents-write',
  templateUrl: './idents-write.component.html',
  styleUrls: ['./idents-write.component.scss']
})
export class IdentsWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private identsSvc: IdentsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    //+
    this.form = this.createForm(new Ident());
    // obtenemos los paises
    this.routeparam({ key: 'id' })
      .pipe(
        // filtramos que no sea new
        filter((paramId) => paramId != 'new'),
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          // consultamos el lenguage
          return this.identItem({ id: paramId });
        })
      )
      .subscribe((lang: IIdents) => {
        this.form = this.createForm(lang);
      });
  }

  routeparam({ key }) {
    return this.activatedRoute.params.pipe(
      map((params) => {
        return params[key];
      })
    );
  }

  identItem({ id }) {
    return this.identsSvc.item({ id }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  createForm(model: IIdents): FormGroup {
    return this.formBuilder.group({
      identId: [
        model.identId,
        Validators.compose([MyValidator.required, MyValidator.minLength(1), MyValidator.maxLength(5)]),
      ],
      name: [model.name, Validators.compose([MyValidator.required])],
      description: [model.name, Validators.compose([MyValidator.required])],
      lenMin: [model.lenMin, Validators.compose([MyValidator.required, MyValidator.integer])],
      lenMax: [model.lenMax, Validators.compose([MyValidator.required, MyValidator.integer])],
      onlyDigits: [model.onlyDigits],
      testing: [model.testing],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    data.onlyDigits = data.onlyDigits ? 1 : 0;
    this.identsSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/idents']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    data.onlyDigits = data.onlyDigits ? 1 : 0;
    this.identsSvc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/idents']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/idents']);
  }

}
