// src/components/TaskForm.js
import React, { Component } from 'react';
import axios from 'axios';
import './TaskForm.css';


class TaskForm extends Component {
  state = {
    title: '',
    description: '',
    due_date: '',
    status: 'Pending',
    showTaskList: false
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/tasks', this.state, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((response) => {
        alert('Task created successfully!');
        console.log("NewTask", response.data)
        // this.props.refreshTasks();
        const newTask = response.data; // The newly created task returned from the API
        // this.props.updateTasksList(newTask); // Update the tasks list in the parent component immediately
        this.props.updateTasksList();
        this.setState({ title: '', description: '', due_date: '', status: 'Pending' });
      })
      .catch(() => {
        alert('Failed to create task.');
      });
  };




  render() {
    // console.log("llllllll--",this.props.token)
    // const overdueTasks = this.props.getOverdueTasks();
    return (
      <div className="task-form-container">
        <form onSubmit={this.handleSubmit} className="task-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
            required
            className="task-form-input"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
            required
            className="task-form-textarea"
          ></textarea>
          <input
            type="date"
            name="due_date"
            value={this.state.due_date}
            onChange={this.handleChange}
            required
            className="task-form-input"
          />
          <select
            name="status"
            value={this.state.status}
            onChange={this.handleChange}
            className="task-form-select"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="task-form-buttons">
            <button type="submit" className="task-form-button">
              Create Task
            </button>
            <button
              type="button"
              className="task-form-logout-button"
              onClick={this.props.handleLogout}
            >
              Logout
            </button>

            <button
              type="button"
              className="task-form-toggle-overdue-button"
              onClick={this.props.toggleTaskList}
            >
            {!this.props.showTaskList ? 'Overdue' : 'Back to TaskList'} 
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TaskForm;
