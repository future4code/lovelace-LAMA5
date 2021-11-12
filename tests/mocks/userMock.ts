import { UserModel, UserRole } from "../../src/model/User.Model";

export const userNormalMock = new UserModel(
  "id_user_1",
  "user1",
  "user1@gmail.com",
  "user1password",
  UserRole.NORMAL
)

export const userAdminMock = new UserModel(
  "id_user_2",
  "user2",
  "user2@gmail.com",
  "user2password",
  UserRole.ADMIN
);