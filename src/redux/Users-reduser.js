import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1 , /*текущая страница*/
    isFetching: true, /*картинка пока грузит*/
    followingInProgress: []  /*дизейблит кнопку*/
};

const usersReducer = (state=initialState,action) => {
    switch (action.type) {
        case FOLLOW:
            return {
             ...state,
             users: state.users.map ( u => {   /*map возвращает новый массив на основе старого*/
                 if(u.id===action.userId) {  /*если id user = id того которого надо зафоловить*/
                     return {...u,followed: true} /*делаем копию и меняем фоловид*/
                 }
                 return u; /*возвращаем изменненный u*/
             })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users:action.users} /*склеиваем два оператора, те которые были в state users и те которые пришли из action*/
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] /*если тру,диструктуризируем массив и вконец дописываем id которая приходит*/
                    : state.followingInProgress.filter(id => id != action.userId)/*если фолс,удаляем из массива одного которого уже задизейблили*/
            }
        }
        default:
            return state;
    }
};

export const followSuccess = (userId) => ({type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId })
export const setUsers = (users) => ({type: SET_USERS, users }) /*берем с сервака users  и засетаем в state*/
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE,currentPage}) /*изменить текущую страницу когда кликаем*/
export const setUsersTotalCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }) /*установить общее количество пользователей*/
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching }) /*крутится картинка пока грузит*/
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId }) /*чтобы не шли запросы когда зажало кнопку*/

export const  getUsers = (currentPage, pageSize) => {
   return (dispatch) => {
       dispatch(toggleIsFetching(true));/*крутится картинка пока грузит*/
       usersAPI.getUsers(currentPage, pageSize).then(data => {
               dispatch(toggleIsFetching(false));
               dispatch(setUsers(data.items));/*сетаем юзеров*/
               dispatch(setUsersTotalCount(data.totalCount));/*устанавливаем общее количество пользователей*/
           });
   }
    }
export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.follow(userId)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch (followSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
}
export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.unfollow(userId)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
}

export default usersReducer;