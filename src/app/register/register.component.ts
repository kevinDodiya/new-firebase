import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  register() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}
