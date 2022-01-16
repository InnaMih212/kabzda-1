import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";


 const DialogItem = (props) => {  //один диалог
    let path='/dialogs/' + props.id;
    return <div className={s.dialog + ' ' + s.active}> {/*просто два класса*/}
        <NavLink to={path}>{props.name}</NavLink> {/*составили путь и отобразили имя в пропсах*/}
    </div>
}

 export default DialogItem;
