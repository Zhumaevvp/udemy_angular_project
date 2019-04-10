
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Плов',
            'Uzbekistan national meal',
            'https://s2.eda.ru/StaticContent/Photos/120131082439/160124115932/p_O.jpg',
            [
                new Ingredient('Рис', 5),
                new Ingredient('Мясо', 1)
            ]),
        new Recipe(
            'Scirt-steak',
            'Fat meat slice',
            'http://gvozdipub.ru/upload/iblock/df9/df9476badb77faedfe174bc666489959.jpg',
            [
                new Ingredient('Beef', 1),
                new Ingredient('SPG', 5)
            ])
      ];

  constructor(private slService: ShoppingListService) {
  }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
