export class UserRememberStorageModel {
    email?: String;
    password?: String;

    constructor(data?) {
        Object.assign(this, data);
    }
}
