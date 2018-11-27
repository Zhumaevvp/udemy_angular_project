import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test recipe', 'its just a test recipe', 'http://grandkulinar.ru/uploads/posts/2012-02/1329394353_zharenyy-v-kakao-steyk-nyu-york-s-sousom-iz-viski.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
