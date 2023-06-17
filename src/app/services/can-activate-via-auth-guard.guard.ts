import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivate } from "@angular/router";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('token');
    if(token == null) {
      this.router.navigate(["/"]).then(() => { window.location.reload() });
      return false
    } else {
      return true
    }
  }
}