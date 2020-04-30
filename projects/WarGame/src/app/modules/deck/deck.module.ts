import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckPageComponent } from './deck-page/deck-page.component';
import { DeckRoutes } from './deck.routing';
import { RouterModule } from '@angular/router';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { DeckItemComponent } from './components/deck-item/deck-item.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DeckListComponent, DeckPageComponent, DeckFormComponent, DeckItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(DeckRoutes)
  ]
})
export class DeckModule { }
