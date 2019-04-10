import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private shopListService: ShoppingListService,
              private authService: AuthService) {
  }

  public storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put('https://udeny-ng-recipebook.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }


  public storeIngredients() {
    const token = this.authService.getToken();

    return this.http.put(
      'https://udeny-ng-recipebook.firebaseio.com/ingredients.json?auth=' + token,
      this.shopListService.getIngredients()
    );
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://udeny-ng-recipebook.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (responce: Response) => {
          const recipes: Recipe[] = responce.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  getIngredients() {
    const token = this.authService.getToken();

    this.http.get('https://udeny-ng-recipebook.firebaseio.com/ingredients.json?auth=' + token)
      .pipe(map(
        (responce: Response) => {
          const ingredients: Ingredient[] = responce.json();
          return ingredients;
        }
      ))
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.shopListService.setIngredients(ingredients);
        }
      );
  }

}
