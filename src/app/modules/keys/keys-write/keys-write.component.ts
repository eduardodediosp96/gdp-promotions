import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeysService } from '../keys.service';
import { IKeys, Key } from '../keys.interface';
import { map, filter, switchMap } from 'rxjs/operators';
import { MyValidator } from '@core/components/atoms/atoms-form-field/control-error/my-validator';

@Component({
  selector: 'app-keys-write',
  templateUrl: './keys-write.component.html',
  styleUrls: ['./keys-write.component.scss']
})
export class KeysWriteComponent implements OnInit {
  id;
  pageType = 'new';
  form: FormGroup;
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private keysSvc: KeysService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    //+
    this.form = this.createForm(new Key());
    // obtenemos los paises
    this.routeparam({ key: 'id' })
      .pipe(
        // filtramos que no sea new
        filter((paramId) => paramId != 'new'),
        switchMap((paramId) => {
          this.pageType = 'upd';
          this.id = paramId;
          // consultamos el lenguage
          return this.dentItem({ id: paramId });
        })
      )
      .subscribe((lang: IKeys) => {
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

  dentItem({ id }) {
    return this.keysSvc.item({ id }).pipe(
      map((result) => {
        return result.data.item;
      })
    );
  }

  createForm(model: IKeys): FormGroup {
    return this.formBuilder.group({
      keyId: [
        model.keyId,
        Validators.compose([MyValidator.required, MyValidator.minLength(1), MyValidator.maxLength(5)]),
      ],
      description: [model.description, Validators.compose([MyValidator.required])],
      testing: [model.testing],
    });
  }

  handleNewItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.keysSvc
      .newItem({
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/keys']);
      });
  }

  handleUpdItem(): void {
    if (!this.form.valid) return;
    const data = this.form.value;
    data.testing = data.testing ? 1 : 0;
    this.keysSvc
      .updItem({
        id: this.id,
        body: data,
      })
      .subscribe((result) => {
        this.router.navigate(['/keys']);
      });
  }

  handleCancel(): void {
    this.router.navigate(['/keys']);
  }

}
