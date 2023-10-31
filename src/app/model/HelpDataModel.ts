export class HelpDataModel {
    email?: String;
    subject?: String;
    description?: String;

    constructor(data?) {
        Object.assign(this, data);
    }
}