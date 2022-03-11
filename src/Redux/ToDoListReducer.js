import { ToDoListPrimaryTheme } from "../JSS_StyledComponent/Themes/ToDoListPrimaryTheme";
import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_STATE,
} from "./Types/ToDoListTypes";
import { Theme } from "../JSS_StyledComponent/Themes/ThemeManager";

const todolistState = {
  theme: ToDoListPrimaryTheme,
  taskList: [
    {
      id: "task-1",
      taskName: "Learn ReactJS",
      status: true,
    },
    {
      id: "task-2",
      taskName: "Drink Water",
      status: true,
    },
    {
      id: "task-3",
      taskName: "Get up imediately!",
      status: false,
    },
    {
      id: "task-4",
      taskName: "Be come a Front End Dev",
      status: false,
    },
  ],

  editTask: {
    id: "task-1",
    taskName: "Learn ReactJS",
    status: false,
  },
};

export default (state = todolistState, action) => {
  switch (action.type) {
    case ADD_TASK:
      if (action.newTask.taskName.trim() === "") {
        return { ...state };
      }

      let newTaskList = [...state.taskList];
      let index = newTaskList.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      if (index !== -1) {
        alert("Task name is already exists!");
        return { ...state };
      }
      state.taskList = [...state.taskList, action.newTask];

      return { ...state };

    case CHANGE_THEME: {
      let theme = Theme.find((theme) => theme.name === action.themeName);
      if (theme) {
        state.theme = { ...theme.theme };
      }

      return { ...state };
    }

    case DONE_TASK: {
      let newTaskList = [...state.taskList];
      let index = newTaskList.findIndex((task) => task.id === action.taskID);

      if (index !== -1) {
        newTaskList[index].status = true;
      }

      return { ...state, taskList: newTaskList };
    }

    case DELETE_TASK: {
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskID),
      };
    }

    case EDIT_TASK: {
      state.editTask = action.task;

      return { ...state };
    }

    case UPDATE_STATE: {
      state.editTask = { ...state.editTask, taskName: action.taskName };

      let newTaskList = [...state.taskList];
      let index = newTaskList.findIndex(
        (task) => task.id === state.editTask.id
      );

      if (index !== -1) {
        newTaskList[index] = state.editTask;
      }

      state.taskList = newTaskList;
      return { ...state };
    }

    default:
      return state;
  }
};
