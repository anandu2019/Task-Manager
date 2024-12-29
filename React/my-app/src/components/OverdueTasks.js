import React, { Component } from 'react';
import axios from 'axios';
class OverdueTasks extends Component {

  state = {
    overdueTasks: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/tasks/overdue_tasks', {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({ overdueTasks: response.data });
      })
      .catch((error) => {
        console.error('Error fetching overdue tasks:', error);
        alert('Failed to fetch overdue tasks. Please log in again.');
      });
  }
  render() {

    const { overdueTasks } = this.state;

    return (
      <div className="task-list-container">
        <h2>Overdue Task List</h2>
        {overdueTasks && Object.keys(overdueTasks).length > 0 ? (
          Object.entries(overdueTasks).map(([status, tasks]) => (
            <div key={status} className="task-group">
              <h3>{status}</h3>
              <table className="task-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{new Date(task.due_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No overdue tasks available</p>
        )}
      </div>
    );
  }
}
export default OverdueTasks;
