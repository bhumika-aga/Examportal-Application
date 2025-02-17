import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void { }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required!', '', { duration: 2000 });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required!', '', { duration: 2000 });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire(
          'Success',
          'Successfully registered the user! User Id is ' + data.id,
          'success'
        );
      },
      (error) => {
        console.log(error);
        this.snack.open(error.error.text, '', { duration: 2000 });
      }
    );
  }
}
