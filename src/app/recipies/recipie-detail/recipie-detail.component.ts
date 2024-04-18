import { Component, OnInit } from '@angular/core';
import { Recipie } from '../recipie.model';
import { RecipieService } from '../recipie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrl: './recipie-detail.component.css',
})
export class RecipieDetailComponent implements OnInit {
  // Arguments
  recipie: Recipie;
  id: number;

  // Constructor with arguments
  constructor(
    private recipieService: RecipieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Hooks
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipie = this.recipieService.getRecipie(this.id);
    });
  }

  // Methods
  onAddToShoppingList() {
    this.recipieService.addIngredientsToShoppingList(this.recipie.ingredients);
  }

  onEditRecipie() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipie() {
    this.recipieService.deleteRecipie(this.id);
    this.router.navigate(['/recipies']);
  }
}
