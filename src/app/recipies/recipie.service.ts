import { Injectable } from '@angular/core';
import { Recipie } from './recipie.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipieService {
  // Arguments
  recipieChanged = new Subject<Recipie[]>();
  // private recipies: Recipie[] = [
  //   new Recipie(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipie(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   ),
  // ];
  private recipies: Recipie[] = [];

  // Constructor with arguments
  constructor(private slService: ShoppingListService) {}

  // Method
  setRecipies(recipies: Recipie[]) {
    this.recipies = recipies;
    this.recipieChanged.next(this.recipies.slice());
  }

  getRecipies() {
    return this.recipies.slice();
  }

  getRecipie(index: number) {
    return this.recipies[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipie(recipie: Recipie) {
    this.recipies.push(recipie);
    this.recipieChanged.next(this.recipies.slice());
  }

  updateRecipie(index: number, newRecipie: Recipie) {
    this.recipies[index] = newRecipie;
    this.recipieChanged.next(this.recipies.slice());
  }

  deleteRecipie(index: number) {
    this.recipies.splice(index, 1);
    this.recipieChanged.next(this.recipies.slice());
  }
}
