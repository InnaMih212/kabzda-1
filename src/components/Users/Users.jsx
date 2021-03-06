import React from "react";
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {usersAPI} from "../../api/api";

let Users = (props) => {
    let pagesCount = Math.ceil /*округляем*/(props.totalUsersCount / props.pageSize);/*количество страниц*/
    let pages = [];/*1страница*/
    for (let i=1; i <= pagesCount; i++){
        pages.push(i);
    }
    return <div>
        <div>
        {pages.map(p => {/*пробегаемся по массиву страниц*/
                return <span className={props.currentPage === p && styles.selectedPage}/*если текущая равна з то этот стиль*/
                             onClick={(e) => {
                                 props.onPageChanged(p); /*запрос за страницкй*/
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
<span>
    <div>
        <NavLink to={ '/profile/' + u.id }>
        <img src={u.photos.small != null ? u.photos.small : userPhoto}
             className={styles.userPhoto}/>
        </NavLink>
    </div>
    <div>
        {u.followed
            ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                /*блокирует интерактивную кнопку,SOME проверяет удовлетваряет какой либо элемент условию*/
                      onClick={() => {props.unfollow(u.id) }}>
                unfollow</button>
            : <button disabled ={props.followingInProgress.some(id => id === u.id)}
                      onClick={() => {props.follow(u.id) }}>
                follow</button> }
    </div>
</span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;