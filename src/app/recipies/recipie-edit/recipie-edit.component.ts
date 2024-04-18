import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipieService } from '../recipie.service';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrl: './recipie-edit.component.css',
})
export class RecipieEditComponent implements OnInit {
  // Arguments
  id: number;
  editMode = false;
  recipieForm: FormGroup;

  get controls() {
    return (<FormArray>this.recipieForm.get('ingredients')).controls;
  }

  // Constructor
  constructor(
    private route: ActivatedRoute,
    private recipieService: RecipieService,
    private router: Router
  ) {}

  // Hooks
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  // Methods
  private initForm() {
    let recipieName = '';
    let recipieImagePath = '';
    let recipieDescription = '';
    let recipieIngredients = new FormArray([]);

    if (this.editMode) {
      const recipie = this.recipieService.getRecipie(this.id);
      recipieName = recipie.name;
      recipieImagePath = recipie.imagePath;
      recipieDescription = recipie.description;
      if (recipie['ingredients']) {
        for (let ingredient of recipie.ingredients) {
          recipieIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipieForm = new FormGroup({
      name: new FormControl(recipieName, Validators.required),
      imagePath: new FormControl(recipieImagePath, Validators.required),
      description: new FormControl(recipieDescription, Validators.required),
      ingredients: recipieIngredients,
    });
  }

  onSubmit() {
    // const newRecipie = new Recipie(
    //   this.recipieForm.value['name'],
    //   this.recipieForm.value['description'],
    //   this.recipieForm.value['imagePath'],
    //   this.recipieForm.value['ingredients']
    // )

    if (this.editMode) {
      this.recipieService.updateRecipie(this.id, this.recipieForm.value);
    } else {
      this.recipieService.addRecipie(this.recipieForm.value);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipieForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipieForm.get('ingredients')).removeAt(index);
  }
}
