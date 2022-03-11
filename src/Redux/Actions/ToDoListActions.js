import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_STATE,
} from "../Types/ToDoListTypes";

export const addTaskAction = (newTask) => {
  return {
    type: ADD_TASK,
    newTask,
  };
};

export const changeThemeAction = (value) => {
  return {
    type: CHANGE_THEME,
    themeName: value,
  };
};

export const doneTaskAction = (taskID) => ({
  type: DONE_TASK,
  taskID,
});

export const deleteTaskAction = (taskID) => ({
  type: DELETE_TASK,
  taskID,
});

export const editTaskAction = (task) => ({
  type: EDIT_TASK,
  task,
});

export const updateTaskAction = (taskName) => ({
  type: UPDATE_STATE,
  taskName,
});
