import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipie } from './recipie.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipieService } from './recipie.service';

@Injectable({ providedIn: 'root' })
export class RecipiesResolverService implements Resolve<Recipie[]> {
  // Arguments

  // Constructor
  constructor(
    private dataStorageService: DataStorageService,
    private recipiesService: RecipieService
  ) {}

  // Hooks

  // Methods
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipies = this.recipiesService.getRecipies();
    if (recipies.length === 0) {
      return this.dataStorageService.fetchRecipies();
    } else recipies;
  }
}
