export class User {
  id: number | undefined;
  email: string;
  firstName: string;
  lastName: string;
}

export class UserModel extends User {
  saving: boolean;
}
