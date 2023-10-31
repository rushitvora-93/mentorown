export class ResumeModel {
    id?: String = '';
    folder?: String = '';
    // Page1
    job_title?: String = '';
    reporting_to?: String = '';
    team?: String = '';
    location?: String = '';
    job_purpose?: String = '';
    organisation?: String = '';
    work_industry?: String = '';
    work_organisation?: String = '';
    experience?: String = '';
    job_type?: String = '';
    tempJob?: any[] = [];
    // Page2
    tempCompe?: any[] = [];
    technical_skills: any[] = [];
    industry_skills: any[] = [];
    language_skills: any[] = [];
    qualifications: any[] = [];
    competencies?: any = [];
    technical_skills_data?: String = '';
    industry_skills_data?:  String = '';
    language_skills_data?: String = '';
    qualifications_data?: String = '';
    report_title?:  String = '';
    description?:  String = '';
    // Page3
    role_name?: String = '';
    pdf?: boolean;
    word?: boolean;

    constructor(data?) {
        Object.assign(this, data);
    }
}
