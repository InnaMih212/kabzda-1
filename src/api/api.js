import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ceeb3850-b4dc-4bf6-954e-4173ecacf2a5"
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId); /*если ктотот вызовет профайл тут перекинь на профайлапи*/

    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get ('profile/status/' + userId); /*статус юзера*/
    },
    updateStatus (status) {
        return instance.put ('profile/status', {status: status }); /*свой статус, передаем json обьект*/
    }

};
 export const authAPI = {
     me() {
         return instance.get(`auth/me`)
     }
 }




