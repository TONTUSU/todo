import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SnackService} from "../shared/services/snack.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: any
  aSub!: Subscription

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
    if (this.aSub) this.aSub.unsubscribe()
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.register(this.form.value)
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
