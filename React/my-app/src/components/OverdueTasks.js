import React, { Component } from 'react';
class OverdueTasks extends Component {
    render() {
        return(

       <div className="task-list-container">
        <h2>Overdue Task List</h2>
        {this.props.showTaskList && this.props.overdueTasks.length > 0 ? (
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {this.props.overdueTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.due_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No overdue tasks available</p>
        )}
      </div>
    );
  }
}
export default OverdueTasks;