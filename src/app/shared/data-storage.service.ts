import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private shopListService: ShoppingListService,
              private authService: AuthService,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {
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
        (responce) => {
          const recipes: any = responce;
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
        (responce) => {
          const ingredients: any = responce;
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
