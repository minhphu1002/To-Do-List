import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  ContainerFluid,
  Layer,
} from "../../ComponentsToDoList/Container";
import { ThemeProvider } from "styled-components";
import { Dropdown } from "../../ComponentsToDoList/Dropdown";
import { Heading2, Heading3 } from "../../ComponentsToDoList/Heading";
import { TextField } from "../../ComponentsToDoList/TextField";
import { Button } from "../../ComponentsToDoList/Button";
import { Table, Tr, Th, Thead } from "../../ComponentsToDoList/Table";
import {
  addTaskAction,
  changeThemeAction,
  deleteTaskAction,
  doneTaskAction,
  editTaskAction,
  updateTaskAction,
} from "../../../Redux/Actions/ToDoListActions";
import { Theme } from "../../Themes/ThemeManager";

class ToDoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };

  taskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.status)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">


              <Button className="ml-1">
                <i
                  onClick={() =>
                    this.setState(
                      {
                        disabled: false,
                      },
                      () => {
                        this.props.dispatch(editTaskAction(task));
                      }
                    )
                  }
                  className="fa fa-edit"
                ></i>
              </Button>


              
              <Button className="ml-1">
                <i
                  onClick={() => {
                    this.props.dispatch(doneTaskAction(task.id));
                  }}
                  className="fa fa-check"
                ></i>
              </Button>
              <Button className="ml-1">
                <i
                  onClick={() => {
                    this.props.dispatch(deleteTaskAction(task.id));
                  }}
                  className="fa fa-trash"
                ></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  taskComplete = () => {
    return this.props.taskList
      .filter((task) => task.status)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">
                <i
                  onClick={() => {
                    this.props.dispatch(deleteTaskAction(task.id));
                  }}
                  className="fa fa-trash"
                ></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTheme = () => {
    return Theme.map((theme, index) => {
      return <option key={index}>{theme.name}</option>;
    });
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <ContainerFluid
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundImage: "url('./img/5.jpg')",
            backgroundSize: "100%",
          }}
        >
          <Layer
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <Container
              className="w-30"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                borderRadius: 16,
                boxShadow: "rgba(12, 12, 17, 0.5) 0px 8px 24px",
              }}
            >
              <Dropdown
                onChange={(e) => {
                  let { value } = e.target;
                  this.props.dispatch(changeThemeAction(value));
                }}
              >
                {this.renderTheme()}
              </Dropdown>
              <Heading2>MRX 's to do list</Heading2>
              <TextField
                value={this.state.taskName}
                onChange={(e) => {
                  this.setState({
                    taskName: e.target.value,
                  });
                }}
                name="taskName"
                label="Task name"
                className="w-50 my-2"
              />


              <Button
                onClick={() => {
                  let { taskName } = this.state;
                  let newTask = {
                    id: Date.now(),
                    taskName: taskName,
                    status: false,
                  };

                  this.props.dispatch(addTaskAction(newTask));
                  this.setState({
                    taskName: "",
                  });
                }}
                className="ml-2"
              >
                <i className="fa fa-plus"></i> Add
              </Button>



              {this.state.disabled ? (
                <Button
                  disabled
                  onClick={() =>
                    this.props.dispatch(updateTaskAction(this.state.taskName))
                  }
                  className="ml-2"
                >
                  <i className="fa fa-upload"></i> Update
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    let { taskName } = this.state;

                    this.setState(
                      {
                        disabled: true,
                        taskName: "",
                      },
                      () => {
                        this.props.dispatch(updateTaskAction(taskName));
                      }
                    );
                  }}
                  className="ml-2"
                >
                  <i className="fa fa-upload"></i> Update
                </Button>
              )}

              <hr />
              <Heading3>Task to do</Heading3>
              <Table>
                <Thead>{this.taskToDo()}</Thead>
              </Table>
              <Heading3>Task completed</Heading3>
              <Table>
                <Thead>{this.taskComplete()}</Thead>
              </Table>
            </Container>
          </Layer>
        </ContainerFluid>
      </ThemeProvider>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editTask.id !== this.props.editTask.id) {
      this.setState({
        taskName: this.props.editTask.taskName,
      });
    }
  }
}

const mapStaeToProps = (state) => {
  return {
    theme: state.ToDoListReducer.theme,
    taskList: state.ToDoListReducer.taskList,
    editTask: state.ToDoListReducer.editTask,
  };
};

export default connect(mapStaeToProps)(ToDoList);
