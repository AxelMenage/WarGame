import { User } from '../../api/models';

export function getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
}

export function getLetterFromNumber(n: number){
  return String.fromCharCode(97 + n).toUpperCase();
}