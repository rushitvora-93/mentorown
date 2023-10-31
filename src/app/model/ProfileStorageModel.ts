export class ProfileStorageModel {
    id?: String = '';
    alternateEmail?: String;
    first_name?: String;
    last_name?: String;
    user_image = '';
    phone?: Number;
    address?: String;
    notify?: any = false;

    technical_skills?: any[] = [];
    industry_skills?: any[] = [];
    language_skills?: any[] = [];
    qualification?: any[] = [];
    describe_yourself: String;
    des_val_strengths: String;

    decisionStyles?: any[] = [];
    communication_style?: any = [];
    work?: any = [];
    motivations?: Array<{name: string,  active: any, index: any, key?: any}> = [];

    directRangeAttitude: any = '0';
    resultsRangeAttitude: any = '0';
    inspiringRangeAttitude: any = '0';
    balancedRangeAttitude: any = '0';
    perspectiveRangeAttitude: any = '0';
    focusedRangeAttitude: any = '0';

    repetitveRangeAttitude?: any = '0';
    symanticRangeAttitude?: any = '0';
    bigpictureRangeAttitude?: any = '0';
    firstresultRangeAttitude?: any = '0';
    maintainRangeAttitude?: any = '0';
    creativityRangeAttitude?: any = '0';
    beingRangeAttitude?: any = '0';
    helpingRangeAttitude?: any = '0';

    experience?: Array<{}> = [];
    // Page4
    achievements?: Array<{}> = [];

    constructor(data?) {
        Object.assign(this, data);
    }
}
