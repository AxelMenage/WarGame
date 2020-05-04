import { NgModule } from '@angular/core';
import { AdminLibComponent } from './admin-lib.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { WaiterComponent } from './waiter/waiter.component';



@NgModule({
  declarations: [AdminLibComponent, NotFoundComponent, WaiterComponent],
  imports: [
    RouterModule
  ],
  exports: [AdminLibComponent, NotFoundComponent, WaiterComponent]
})
export class AdminLibModule { }
