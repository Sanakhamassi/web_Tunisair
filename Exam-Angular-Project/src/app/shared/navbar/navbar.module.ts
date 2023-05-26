import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';

@NgModule({
    imports: [RouterModule, CommonModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent]
})

export class NavbarModule {
    constructor(private router: Router) { }

    redirectTologin() {
        this.router.navigate(['/login']);
    }
}
