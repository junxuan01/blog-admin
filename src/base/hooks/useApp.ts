import { App } from 'antd';

export const useAppMessage = () => {
  const { message } = App.useApp();
  return message;
};

export const useAppModal = () => {
  const { modal } = App.useApp();
  return modal;
};

export const useAppNotification = () => {
  const { notification } = App.useApp();
  return notification;
};
