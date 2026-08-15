export interface MockUser {
  id: string;
  username: string;
  password: string;
  displayName: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    username: 'user1',
    password: 'password123',
    displayName: 'User One',
  },
  {
    id: '2',
    username: 'admin',
    password: 'admin123',
    displayName: 'Admin',
  },
];
