import * as firebase from 'firebase';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {
  }


  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => window.alert(error.message)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
              this.token = token;
              this.storage.set('user', this.token);
            });
        }
      )
      .catch(
        error => window.alert(error.message)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.storage.remove('user');
    this.router.navigate(['/']);
  }

  getToken() {
    if (this.storage.get('user')) {
      return this.storage.get('user');
    } else {
      firebase.auth().currentUser.getIdToken().then(
        (token: string) => this.token = token
      );
      this.storage.set('user', this.token);
      return this.token;
    }
  }

  isAuthenticated() {
    if (this.storage.get('user')) {
      return this.storage.get('user') != null;
    } else {
      return this.token != null;
    }
  }
}
