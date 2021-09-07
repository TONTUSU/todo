import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {ReplaySubject} from "rxjs";
import {SnackService} from "../shared/services/snack.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: any
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1)
  constructor(private auth: AuthService,
              private router: Router,
              private snackService: SnackService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    })
  }

  ngOnDestroy() {
    this.destroy.next(null)
    this.destroy.complete()
  }

  onSubmit() {
    this.form.disable()
    this.auth.register(this.form.value).pipe(takeUntil(this.destroy))
      .subscribe(
        () => {
          this.router.navigate(['/login'], {queryParams: {registered: true}
          })
        },
        error => {
          this.snackService.openSnackBar(error.error.message, 'Ok')
          this.form.enable()
        }
      )
  }
}
