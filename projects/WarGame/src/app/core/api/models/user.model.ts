export class User {
    id: number;
    nickname: string;
    email: string;
    points: number;
    token?: string;

    public saveLocal() {
        localStorage.setItem('currentUser', JSON.stringify(this));
    }

    public saveSession() {
        localStorage.setItem('currentUser', JSON.stringify(this));
    }
}