import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckPageComponent } from './deck-page/deck-page.component';
import { DeckRoutes } from './deck.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DeckListComponent, DeckPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DeckRoutes)
  ]
})
export class DeckModule { }
