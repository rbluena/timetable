import { closeModal, openModal } from '@app/reducers/globalReducer';

export const closeModalAction = () => ({
  type: closeModal,
});

export const openModalAction = (name) => ({
  type: openModal,
  payload: name,
});
