import React from "react";

 class ProfileStatus extends React.Component {
     state = {
         editMode: false,
         status: this.props.status
     }
     activateEditMode = ()  => {
         this.setState({
             editMode: true
         }); /*метод для изменения стейта, чтобы ревкт отреагировал*/
     }

     deactivateEditMode = () => {
         this.setState({
             editMode: false
         });
    this.props.updateStatus(this.state.status);
     } /*метод для изменения стейта, чтобы ревкт отреагировал*/

     onStatusChange = (e) => {
         this.setState({
             status: e.currentTarget.value
         }); /*обработчик который меняет state */
     };

     componentDidUpdate(prevProps, prevState, snapshot) {
         if (prevProps.status !== this.props.status) {
             this.setState({
                 status: this.props.status
             });/*если статус не равен статусу из пропс то перезатираем старый статус */
         }
     } /* метод жизненного цикла, чтото в стейте обновилось */

     render() {
         return (
             <div>
                 {!this.state.editMode &&
                 <div>
                     <span onDoubleClick={this.activateEditMode}>{this.props.status || "---"}</span>
                 </div>
                 }
                 {this.state.editMode &&
                 <div>
                     <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode } value={this.state.status}/>
                 </div>
                 }
             </div>
         )
     }
 };

export default ProfileStatus;