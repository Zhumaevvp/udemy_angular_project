import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements DoCheck {
  public myRoute = '';

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              public router: Router) {
  }

  public ngDoCheck() {
    this.myRoute = JSON.stringify(this.router.url).replace(/['"«»]/g, '');
  }

  public onSaveRecipies() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  public onFetchRecipies() {
    this.dataStorageService.getRecipes();
  }

  public onSaveIngredients() {
    this.dataStorageService.storeIngredients().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  public onFetchIngredients() {
    this.dataStorageService.getIngredients();
  }

  public onLogout() {
    this.authService.logout();
  }

}
