// tslint:disable-next-line:quotemark
import { Recipe } from "./recipe.model";
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Test recipe', 'its just a test recipe', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
        // tslint:disable-next-line:max-line-length
        new Recipe('Second Test recipe', 'its just a test recipe', 'https://st3.depositphotos.com/4216129/12650/v/950/depositphotos_126503076-stock-illustration-best-recipe-beer-logo-design.jpg')
      ];

    getRecipes() {
        return this.recipes.slice();
    }
}
