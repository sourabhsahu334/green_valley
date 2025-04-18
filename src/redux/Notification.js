import {http} from '../utiles/AxiosInstance';

export const sendNotificationUsertoUser = async (id, title, message) => {
    try {
        const data = await http.post('user/sendnotification', {
            id: 'fLEaNn6zQJCVpVwSrYeOHh:APA91bGY5iKnOgbS-NEmoZMRpkGUozqmeceDfijlIMk2XaBPtZpzl-_2v81EwKVtehMO_jB_Mg6tTbTG79C4ROLvFmoraQFT4JtyCLbKsKt-RvDih29h8lpjaAMBM-QoQ75i793D4YVD',
            title: 'test title',
            message: 'send from backend',
          });
          console.log(data.data);
    } catch (error) {
        console.log(error);
    }
};
