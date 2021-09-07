import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ReplaySubject} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SnackService} from "../shared/services/snack.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('trigger', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('500ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('500ms', style({opacity: 0}))
      ])
    ])
  ]
})

export class LoginPageComponent implements OnInit, OnDestroy {
  isShown = false
  form: any
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1)
  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackService: SnackService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    })
    this.route.queryParams.pipe(takeUntil(this.destroy)).subscribe((params: Params)=> {
      if (params['registered']) {
        this.snackService.openSnackBar('Теперь вы можете войти', 'Отлично')
        console.log('Теперь вы можете войти')
      } else if (params['accessDenied']) {
        console.log('Session failed')
      } else if (params['sessionFailed']) {
      }

    })
  }

  ngOnDestroy() {
    this.destroy.next(null)
    this.destroy.complete()
  }

  onSubmit() {
    this.form.disable()
    this.auth.login(this.form.value).pipe(takeUntil(this.destroy)).subscribe(
      () => this.router.navigate(['/todo']),
      error => {
        this.snackService.openSnackBar(error.error.message, 'Ok')
        this.form.enable()
      }
    )
  }

}
