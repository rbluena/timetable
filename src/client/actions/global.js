import {
  closeModal,
  openModal,
  openDrawer,
  closeDrawer,
} from '@app/reducers/globalReducer';

export const closeModalAction = () => ({
  type: closeModal,
});

export const openModalAction = (name) => ({
  type: openModal,
  payload: name,
});

export const openDrawerAction = (name) => ({
  type: openDrawer,
  payload: name,
});

export const closeDrawerAction = () => ({
  type: closeDrawer,
});
