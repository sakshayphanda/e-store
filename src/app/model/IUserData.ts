export interface IUserData {
  loading: boolean;
  isLoggedIn: boolean;
  uid: string;
  userDetails: firebase.UserInfo;
  role: string;
}
