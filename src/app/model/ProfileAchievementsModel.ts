export class ProfileAchievementModel {
    id?: String = '';
    title?: any = '';
    role?: String = '';
    capabilities?: any = [];
    situation?: String = '';
    action?: String = '';
    result?: String = '';

    constructor(data?) {
        Object.assign(this, data);
    }
}
