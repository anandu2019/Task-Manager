// // src/components/TaskList.js
// import React, { Component } from 'react';
// import axios from 'axios';



// class TaskList extends Component {
//   state = {
//     tasks: this.props.tasks,
//   };

//   componentDidMount() {
//     this.fetchTasks(this.props.token);
//   }

//   fetchTasks = (token) => {
//     // const token = localStorage.getItem('jwt_token')
//     axios
//     .get('http://localhost:3000/tasks', {
//       headers: {
//         Authorization: `Bearer ${token}` // Attach the token in the header
//       }
//     })
//       .then((response) => {
//         this.setState({ tasks: response.data });
//       })
//       .catch(() => {
//         alert('Failed to fetch tasks.');
//       });
//   };

//   handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:3000/tasks/${id}`, {
//         headers: { Authorization: `Bearer ${this.props.token}` },
//       })
//       .then(() => {
//         this.fetchTasks(this.props.token);
//       })
//       .catch(() => {
//         alert('Failed to delete task.');
//       });
//   };

//   render() {
//     return (
//       <ul>
//         {this.state.tasks.map((task) => (
//           <li key={task.id}>
//             {task.title} - {task.status}
//             <button onClick={() => this.handleDelete(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

// export default TaskList;

import React, { Component } from 'react';
import './TaskList.css';

class TaskList extends Component {
 
  render() {
    const { tasks, onDeleteTask } = this.props;
    

    return (
      <div className="task-list-container">
        <h2>Task List</h2>
        {tasks.length > 0 ? (
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.due_date}</td>
                  <td>
                  <select
                    value={task.status} // Make sure this is always the current status
                    onChange={(e) => this.props.handleUpdateTask(task.id, e.target.value)}>
                      <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => this.props.onDeleteTask(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    );
  }
}

export default TaskList;
