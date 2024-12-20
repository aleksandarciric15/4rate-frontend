import { User } from "./user";

export type Notification = {
  id: number;
  message: string;
  createdAt: Date;
  isRead: boolean;
  title: string;
  userAccount: User;
};

export enum NotificationType {
  NOTIFICATION_GUEST = "notification-guest",
  NOTIFICATION_MANAGER = "notification-manager",
}
