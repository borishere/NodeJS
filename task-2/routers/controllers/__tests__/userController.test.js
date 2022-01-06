import 'regenerator-runtime/runtime';
import { db } from '../../../data-access/db.js';
import { userService } from '../../../services/userService.js';

const mockUser = {
  id: '235',
  login: 'Boris',
  password: '43467689',
  age: 31,
  isdeleted: false
};

jest.mock('../../../data-access/db.js', () => ({
  db: {
    user: {
      getUser: () => mockUser,
      getUserByCredentials: () => mockUser,
      updateUser: (userId, userDTO) => ({ ...mockUser, ...userDTO })
    }
  }
}));

describe('userController', () => {

  test('getUser', async () => {
    const user = await userService.getUser(235);

    expect(user).toStrictEqual(mockUser);
  });

  test('getUser null', async () => {
    db.user.getUser = () => undefined;

    const user = await userService.getUser(235);

    expect(user).toBeNull();
  });

  test('getUserByCredentials', async () => {
    const user = await db.user.getUserByCredentials('Boris', '43467689');

    expect(user).toStrictEqual(mockUser);
  });

  test('updateUser', async () => {
    const user = await db.user.updateUser('235', { age: 7, password: '976854' });

    expect(user).toStrictEqual({
      id: '235',
      login: 'Boris',
      password: '976854',
      age: 7,
      isdeleted: false
    });
  });
});
