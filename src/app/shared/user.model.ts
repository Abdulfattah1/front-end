export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  gender: string;

  constructor(values) {
    this.firstName = values.name.firstName;
    this.lastName = values.name.lastName;
    this.birthday = new Date(
      values.Birthday.year,
      values.Birthday.month - 1,
      values.Birthday.day + 1
    )
      .toJSON()
      .slice(0, 10);
    this.email = values.email;
    this.password = values.Password.password;
    this.confirmPassword = values.Password.confirmPassword;
    this.gender = values.gender;
  }
}
