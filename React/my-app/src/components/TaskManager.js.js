import React, { Component } from 'react';
import axios from 'axios';
import './TaskManager.css';

class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task: { title: '', description: '', due_date: '', status: 'Pending' },
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    axios
      .get('http://localhost:3000/api/v1/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      task: {
        ...prevState.task,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { task } = this.state;

    axios
      .post('http://localhost:3000/api/v1/tasks', task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        this.setState((prevState) => ({
          tasks: [...prevState.tasks, response.data],
          task: { title: '', description: '', due_date: '', status: 'Pending' },
        }));
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  render() {
    const { tasks, task } = this.state;

    return (
      <div className="task-manager">
        <h2>Task Manager</h2>

        {/* Task List */}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.due_date}</p>
              <p>{task.status}</p>
            </li>
          ))}
        </ul>

        {/* Add Task Form */}
        <form className="task-form" onSubmit={this.handleSubmit}>
          <table border="1">
           
          <tbody>
            <tr>Enter Title</tr>
         <tr>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={this.handleChange}
            placeholder="Title"
            required
          />
          </tr>
          <textarea
            name="description"
            value={task.description}
            onChange={this.handleChange}
            placeholder="Description"
            required
          ></textarea>
          <input
            type="datetime-local"
            name="due_date"
            value={task.due_date}
            onChange={this.handleChange}
            required
          />
          <select
            name="status"
            value={task.status}
            onChange={this.handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">Create Task</button>
          </tbody>
          
          </table>
        </form>
       
      </div>
    );
  }
}

export default TaskManager;
