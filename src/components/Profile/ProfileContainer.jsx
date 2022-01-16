import React from 'react';
import Profile from "./Profile";
import {getUserProfile, getStatus , updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import { withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;/*id пользователя*/
        if (!userId) {
            userId = 2;/*если нет id то тогда 2 пользователь*/
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
        render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus = {this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilesPage.profile,
    status: state.profilesPage.status
});

export default compose (
    connect(mapStateToProps,{getUserProfile, getStatus, updateStatus}),
    withRouter,/*данные в юрл*/
   withAuthRedirect
)(ProfileContainer);