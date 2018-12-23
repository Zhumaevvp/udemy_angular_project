
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
            'Plov',
            'Uzbekistan national meal',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Rice', 5),
                new Ingredient('Meat', 1)
            ]),
        new Recipe(
            'Scirt-steak',
            'Fat meat slice',
            'https://st3.depositphotos.com/4216129/12650/v/950/depositphotos_126503076-stock-illustration-best-recipe-beer-logo-design.jpg',
            [
                new Ingredient('Beef', 1),
                new Ingredient('SPG', 5)
            ])
      ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}
