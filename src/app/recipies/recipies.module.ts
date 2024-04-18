import { NgModule } from '@angular/core';
import { RecipiesComponent } from './recipies.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipieItemComponent } from './recipie-list/recipie-item/recipie-item.component';
import { RecipieStartComponent } from './recipie-start/recipie-start.component';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipiesRoutingModule } from './recipies-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent,
    RecipieItemComponent,
    RecipieStartComponent,
    RecipieEditComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipiesRoutingModule,
    SharedModule,
  ],
})
export class RecipiesModule {}
