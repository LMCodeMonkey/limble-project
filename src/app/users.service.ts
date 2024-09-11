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
        id: 1,
      },
      {
        firstName: 'Bobby',
        lastName: 'Franklin',
        icon: faUser,
        id: 2,
      },
      {
        firstName: 'Harvey',
        lastName: 'Wilbur',
        icon: faUser,
        id: 3,
      }
    ];
  }
}

export interface User {
  firstName: string;
  lastName: string;
  icon?: IconDefinition;
  id: number;
}
