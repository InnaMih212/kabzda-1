import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, updateNewPostText,addPostr,updateNewPostTextr} from "./redux/store";

export let rerenderEntirTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 addPost={addPost}
                 updateNewPostText={updateNewPostText}
                 addPostr={addPostr}
                 updateNewPostTextr={updateNewPostTextr} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}