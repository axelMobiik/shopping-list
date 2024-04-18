import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipie } from '../recipie.model';
import { RecipieService } from '../recipie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrl: './recipie-list.component.css',
})
export class RecipieListComponent implements OnInit, OnDestroy {
  // Arguments
  recipies: Recipie[];
  subscription: Subscription;

  // Constructor with arguments
  constructor(
    private recipieService: RecipieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Hooks
  ngOnInit(): void {
    this.subscription = this.recipieService.recipieChanged.subscribe(
      (recipies: Recipie[]) => {
        this.recipies = recipies;
      }
    );
    this.recipies = this.recipieService.getRecipies();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Methods
  onNewRecipie() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
