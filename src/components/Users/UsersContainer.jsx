import React from "react";
import {
    follow, getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow
} from "../../redux/Users-reduser";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class  UsersContainer extends React.Component { /*для каждого пользователя вернуть дивку*/
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }     /*запрос на сервер за страницей*/

    render() {
        return <>
            {this.props.isFetching? <Preloader/> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged ={this.onPageChanged}
                      users={this.props.users}
                      follow ={this.props.follow}
                      unfollow={this.props.unfollow}
                      followingInProgress={this.props.followingInProgress}
        />
    </>/*фейковая заглушка*/
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users, /*пользователи*/
        pageSize: state.usersPage.pageSize, /*страницы*/
        totalUsersCount: state.usersPage.totalUsersCount, /*сколько всего пользователей*/
        currentPage: state.usersPage.currentPage, /*текущая страница*/
        isFetching: state.usersPage.isFetching, /**/
        followingInProgress: state.usersPage.followingInProgress /*зажало кнопку и чтобы не было много запросов*/

    }
};
export default compose (withAuthRedirect,
    connect (mapStateToProps,
    {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers })) (UsersContainer);
