import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
    isEdit = false;

  user = {
    name: 'Divya',
    email: 'Divya@test.com',
    phone: '8585858585'
  };


  editProfile(){

    this.isEdit = true;

  }


  saveProfile(){

    this.isEdit = false;

    localStorage.setItem(
      'profile',
      JSON.stringify(this.user)
    );
  }
    ngOnInit(){

    const data = localStorage.getItem('profile');

    if(data){

      this.user = JSON.parse(data);

    }

  }
}
