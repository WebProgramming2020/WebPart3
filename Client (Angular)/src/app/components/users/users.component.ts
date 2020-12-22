import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {IUser} from '../../user';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public users: IUser[];
  public columns = ['name', 'email', 'username', 'delete'];
  public id: any;
  constructor(private userService : UserService,) { }

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe((users: IUser[]) => {
      this.users = users;
      this.loading = false;
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.loading = false;
    });
  }
  deleteUser(username: string) {
    this.userService.deleteUser(username)
      .pipe(
        mergeMap(() => this.userService.getUsers())
      )
      .subscribe((users: IUser[]) => {
        this.users = users;
        this.successMsg = 'Successfully Deleted User';
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }
}
