import React from "react";
import MyPosts from "./MyPosts";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return{
        posts : state.profilesPage.posts,
        newPostText: state.profilesPage.newPostText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
};

const MyPostsContainer = connect (mapStateToProps,mapDispatchToProps)(MyPosts);

export  default  MyPostsContainer;