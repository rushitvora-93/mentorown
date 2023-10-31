export class UserResetPasswordModel {
    email?: String;
    current_password?: String;
    password?: String;

    constructor(data?) {
        Object.assign(this, data);
    }
}
