export class User {
    id: number;
    username: string;
    mail: string;
    firstName: string;
    lastName: string;
    token?: string;

    public saveLocal() {
        localStorage.setItem('currentUser', JSON.stringify(this));
    }

    public saveSession() {
        localStorage.setItem('currentUser', JSON.stringify(this));
    }
}