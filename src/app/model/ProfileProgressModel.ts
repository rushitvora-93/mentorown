export class ProfileProgressStorageModel {
    about?: Number = 0;
    skill?: Number = 0;
    preference?: Number = 0;
    experience?: Number = 0;
    achievement?: Number = 0;
    aboutPercent?: Number = 0;
    skillPercent?: String = '';
    preferencePercent?: String = '';
    experiencePercent?: String = '';
    achievementPercent?: String = '';
    constructor(data?) {
        Object.assign(this, data);
    }
}
