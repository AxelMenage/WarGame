import { NgModule } from '@angular/core';
import { AdminLibComponent } from './admin-lib.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AdminLibComponent, NotFoundComponent],
  imports: [
    RouterModule
  ],
  exports: [AdminLibComponent, NotFoundComponent]
})
export class AdminLibModule { }
