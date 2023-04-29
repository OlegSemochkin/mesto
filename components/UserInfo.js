export default class UserInfo {
  constructor ({userName, userJob}) {
this._userName = document.querySelector(`.${userName}`);
this._userJob = document.querySelector(`.${userJob}`);
// console.log(this._userName);
// console.log(this._userJob);
this._form = document.forms.edit;
this._nameInput = this._form.elements.firstname;
this._jobInput = this._form.elements.job
  }

getUserInfo() {
  this._nameInput.value = this._userName.textContent;
  this._jobInput.value = this._userJob.textContent;
  
}

setUserInfo() {
this._userName.textContent = this._nameInput.value;
this._userJob.textContent = this._jobInput.value
}
}
