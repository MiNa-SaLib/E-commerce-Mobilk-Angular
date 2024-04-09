import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/Services/user-registration.service';
import { passwordMatch } from 'src/app/Validators/Password.validator';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  // [x: string]: any;
  userRegisterError: string = '';
  isErrorRegisterFound: boolean = false;
  userRegisterForm: FormGroup;
  specials: RegExp = /[^a-zA-z0-9]/;
  numbers: RegExp = /[0-9]/;
  charsCapitals: RegExp = /[A-Z]/;
  charsLowers: RegExp = /[a-z]/;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private register: UserRegistrationService
  ) {
    console.log(Array.from([1, 2, 3, 4]).splice(0, 2));
    this.userRegisterForm = fb.group(
      {
        firstName: ['', [Validators.required]], //fb.control("")
        lastName: ['', [Validators.required]], //fb.control("")
        email: ['', [Validators.required]],
        role: ['', [Validators.required]],
        password: ['', [Validators.required]],
        ConfirmPassword: ['', [Validators.required]],
      },
      { validators: [passwordMatch()] }
    );
  }
  get firstName() {
    return this.userRegisterForm.get('firstName');
  }
  get lastName() {
    return this.userRegisterForm.get('lastName');
  }
  get email() {
    return this.userRegisterForm.get('email');
  }
  get role() {
    return this.userRegisterForm.get('role');
  }
  get password() {
    return this.userRegisterForm.get('password');
  }
  get ConfirmPassword() {
    return this.userRegisterForm.get('ConfirmPassword');
  }
  addNewUser() {
    console.log(this.userRegisterForm.value);

    this.register.register(this.userRegisterForm.value).subscribe(
      (newUser) => {
        console.log(newUser);

        alert('You Registered successfully');
        this.router.navigate(['login']);
      },
      (ERROR) => {
        this.isErrorRegisterFound = true;
        setTimeout(() => {
          this.isErrorRegisterFound = false;
        }, 3000);
        this.userRegisterError = ERROR.error.message.split(':').splice(-1, 2);
      }
    );
  }
  ngOnInit(): void {}
}
