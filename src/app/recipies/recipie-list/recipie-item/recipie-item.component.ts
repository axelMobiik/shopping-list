import { Component, Input } from '@angular/core';
import { Recipie } from '../../recipie.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css',
})
export class RecipieItemComponent {
  // Arguments
  @Input() recipie: Recipie;
  @Input() index: number;

  // Constructor

  // Methods
}
