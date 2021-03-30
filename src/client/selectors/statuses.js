import { get } from 'lodash';
import { createSelector } from 'reselect';

const selectStatuses = (state) => {
  const statuses = get(state, 'STATUSES.statuses');
  const statusIds = get(state, 'STATUSES.statusIds');

  return { statusIds, statuses };
};

const selectBoard = (state) => {
  const board = {};
  const { statusIds, statuses } = selectStatuses(state);

  if (statusIds) {
    board.columnIds = statusIds;
    board.columns = statuses || {};

    return board;
  }

  return {};
};

// eslint-disable-next-line import/prefer-default-export
export const boardSelector = createSelector(selectBoard, (board) => board);
