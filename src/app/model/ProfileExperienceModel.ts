export class ProfileExperienceModel {
    id?: String = '';
    // Page1
    title?: any = '';
    typeOfJob?: String = '';
    tempJobType?: any[] = [];
    company?: String = '';
    location?: String = '';
    currentlyWorking?: Boolean = false;
    startMonthYear?: String = '';
    endMonthYear?: String = '';
    myIndustryChecked?: Boolean = false;
    industry?: String = '';
    myHedlineChecked?: Boolean = false;
    headline?: String = '';
    description?: String = '';
    mediaUpload?: String = '';
    mediaUploadChecked?: Boolean = false;
    mediaLinkChecked?: Boolean = false;
    mediaLink?: String = '';

    constructor(data?) {
        Object.assign(this, data);
    }
}
