import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipie } from '../recipies/recipie.model';
import { RecipieService } from '../recipies/recipie.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  // Arguments

  // Contructor
  constructor(
    private http: HttpClient,
    private recipieService: RecipieService,
    private authService: AuthService
  ) {}

  // Hooks

  // Methods
  storeRecipies() {
    const recipies = this.recipieService.getRecipies();
    this.http
      .put(
        'https://angular-shopping-recipes-default-rtdb.firebaseio.com/recipies.json',
        recipies
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipies() {
    return this.http
      .get<Recipie[]>(
        'https://angular-shopping-recipes-default-rtdb.firebaseio.com/recipies.json'
      )
      .pipe(
        map((recipies) => {
          return recipies.map((recipie) => {
            return {
              ...recipie,
              ingredients: recipie.ingredients ? recipie.ingredients : [],
            };
          });
        }),
        tap((recipies) => {
          this.recipieService.setRecipies(recipies);
        })
      );
  }
}
