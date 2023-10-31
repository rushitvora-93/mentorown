export class UserRegistrationModel {
    first_name?: String;
    last_name?: String;
    email?: String;
    password?: String;
    constructor(data?) {
        Object.assign(this, data);
    }
}
