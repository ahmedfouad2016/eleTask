import * as Keychain from 'react-native-keychain';

export default class Helpers {
  static SetUser = async (username, password) => {
    let users = await this.GetUsers();
    console.log(users);

    if (users) {
      users = [...users, { username, password }];
      await Keychain.setGenericPassword('users', JSON.stringify(users));
    }
  };

  static GetUser = async (username) => {
    const users = await this.GetUsers();
    if (users) {
      return users.find(user => user.username.toUpperCase() === username.toUpperCase());
    }
    return false;
  };

  static GetUsers = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const users = JSON.parse(credentials.password);
        return users;
      }
      return [];
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
      return false;
    }
  };
}
