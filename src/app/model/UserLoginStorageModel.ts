export class UserLoginStorageModel {
    id?: String;
    token?: String;
    first_name?: String = '';
    last_name?: String = '';
    email?: String = '';
    phone?: String = '';
    job_title?: String = '';
    company?: String = '';
    address?: String = '';
    organization = {id: '',
                    name: '', about_us: '', phone: '', industry: '',
                    address: '', organi_image: '', job_description: '', additional_description: [] };
    purchaseHistory = [];
    currentPurchaseStatus?: any = {id: '', user_id: '', product_id: '', type: '', created_at: '' };
    is_active?: String;
    created_at?: String;
    updated_at?: String;
    user_image?: String = '';

    constructor(data?) {
        Object.assign(this, data);
    }
}
