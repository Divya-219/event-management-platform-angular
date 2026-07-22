import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode = true;

  constructor() {
    const savedTheme =localStorage.getItem('theme');
    if(savedTheme){
      this.darkMode =savedTheme === 'dark';

    }
    this.applyTheme();
  }

  toggleTheme(){
    this.darkMode = !this.darkMode;
    localStorage.setItem( 'theme', this.darkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme(){
    if(this.darkMode){

      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');

    }
    else{

      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');

    }

  }

}
