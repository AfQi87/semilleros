import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  userLogin: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _messageService: MessageService
  ) { }

  // On Forgotpassword link click
  onForgotpassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup() {
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }

  ngOnInit(): void {
    this.userLogin = this.formBuilder.group({
      email: ["", Validators.required, Validators.required, ],
      password: ["", Validators.required]
    })
  }

  login() {
    this._userService.logIn(this.userLogin.value).subscribe({
      next: (data => {
        localStorage.setItem("token", data.token);
        this.router.navigate(["/dashboard"]).then(() => {
          window.location.reload();
        });
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Iniciando sesión' });
      }),
      error: (err: HttpErrorResponse) => {
        console.log("error: ", err);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    })
  }

}
