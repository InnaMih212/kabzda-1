import React from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import {Route} from "react-router-dom";
import News from "./components/Nav/News/News";
import Settings from "./components/Nav/Settings/Settings";
import Music from "./components/Nav/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = (props) => {
       return (
    <div className='app-wrapper'>
              <HeaderContainer />
              <Nav />
            <div className='app-wrapper-content'>
            <Route path='/dialogs'
                   render={ () => <DialogsContainer /> } />  {/*переключение страниц.указываем путь*/}
            <Route path='/profile/:userId?'/*id пользователя*/
                   render={ () => <ProfileContainer /> } />
            <Route path='/news'
                   render={ () => <News /> } />
            <Route path='/settings'
                   render={ () => <Settings /> } />
            <Route path='/music'
                   render={ () => <Music /> } />
                <Route path='/users'
                       render={ () => <UsersContainer /> } />
                <Route path='/login'
                       render= { () => <Login /> } />
            </div>
    </div>
       )
}
export default App;
