import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";



    let addNewPostForm = (props) => {
        return <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" component="textarea" />  {/*окошко для ввода*/}
            </div>
            <div>
                <button> Add post </button>  {/*кнопка,баттон-чтобы нажималась*/}
            </div>
        </form>;
    };

    let addNewPostFormRedux = reduxForm ({form:"profileAddNewPostForm"})(addNewPostForm);

    const MyPosts = (props) => {
        let postsElements =
            props.posts.map( p =><Post message={p.message} like={p.like} />);

        let newPostElement = React.createRef();

        const onAddPost = (values) => {
            props.addPost(values.newPostText);
        };
    return (
        <div className={s.postsBlock}>
          <h3>My posts</h3>
            <addNewPostFormRedux onSubmit={onAddPost} />
       <div className={s.posts}>
           { postsElements }
        </div>
    </div> )
}

export  default  MyPosts;