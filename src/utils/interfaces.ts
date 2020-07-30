export interface IUser {
  login: string,
  avatar_url: string,
}

export interface IPreviewProps {
  currentUser: IUser,
}

export interface IPayloadItems {
  search: string,
  page: number,
  postPerPage: number,
}
