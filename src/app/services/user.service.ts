import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  currentUser: User;
  currentUserKey: string;
  isLoggedIn: boolean = false;

  constructor(private database: AngularFireDatabase) {
    this.users = database.list('users');
  }

  getUsers() {
    return this.users;
  }

  getContacts(userKey: number){
    var contacts = [];
    var users = [];
    contacts.push(this.users[userKey])

    for(let i = 0; i <= 1; i ++){
      if(contacts[i] === this.users[i]){
        users.push(this.users)
      }
    }
    return users;
  }

  getCurrentUser()
  {
    let tempUser;
    let currentUser = this.database.object('users/'+this.currentUserKey);
    currentUser.subscribe(user => {
      tempUser = user;
    });
    return tempUser;
  }

  addUser(username: string,password: string)
  {
    let blogs = this.database.list('blogs');
    var newBlog = new Blog();
    newBlog.addPost('test description');
    let blogKey = blogs.push(newBlog).key;
    let chatKeys = ['0'];
    let contacts = ['0'];
    let newUser = new User(username,password,chatKeys,contacts,blogKey);
    this.users.push(newUser);
  }

  getUser(contactKey: string)
  {
    return this.users;
  }

}
