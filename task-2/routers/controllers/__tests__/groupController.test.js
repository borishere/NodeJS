import 'regenerator-runtime/runtime';
import { db } from '../../../data-access/db.js';
import { groupService } from '../../../services/groupService.js';

const mockGroup = {
  id: '678',
  name: 'Admin',
  permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
};

jest.mock('../../../data-access/db.js', () => ({
  db: {
    group: {
      getGroup: () => mockGroup,
      updateGroup: (groupId, groupDTO) => ({ ...mockGroup, ...groupDTO })
    }
  }
}));

describe('groupController', () => {
  test('getGroup', async () => {
    const group = await groupService.getGroup(678);

    expect(group).toStrictEqual(mockGroup);
  });

  test('getGroup null', async () => {
    db.group.getGroup = () => undefined;

    const group = await groupService.getGroup(678);

    expect(group).toBeNull();
  });

  test('updateGroup', async () => {
    const group = await db.group.updateGroup('678', { permissions: ['WRITE'] });

    expect(group).toStrictEqual({
      id: '678',
      name: 'Admin',
      permissions: ['WRITE']
    });
  });
});
