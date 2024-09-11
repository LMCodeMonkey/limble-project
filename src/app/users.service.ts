import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUsers() {
    return [
      {
        firstName: 'Ted',
        lastName: 'Johnson',
        icon: faUser,
      },
      {
        firstName: 'Bobby',
        lastName: 'Franklin',
        icon: faUser,
      },
      {
        firstName: 'Harvey',
        lastName: 'Wilbur',
        icon: faUser,
      }
    ];
  }
}

export interface User {
  firstName: string;
  lastName: string;
  icon: IconDefinition;
}
