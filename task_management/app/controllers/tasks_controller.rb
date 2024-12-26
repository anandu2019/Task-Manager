class TasksController < ApplicationController
  before_action :set_task, only: [:update, :destroy]

  def index
    tasks = current_user.tasks # Assuming User `has_many :tasks`
    render json: tasks
  end

  def create
    task = current_user.tasks.new(task_params)
    if task.save
      render json: task, status: :created
    else
      render json: { error: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: { error: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  def overdue_tasks
    overdue_tasks = Task.where('due_date < ? AND status != ?', Time.now, 'Completed')  
    grouped_tasks = overdue_tasks.group_by(&:status)  

    # Render the grouped tasks as JSON
    render json: grouped_tasks
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Task not found' }, status: :not_found
  end

  def set_task_by_find_by
    @task = current_user.tasks.find_by(id: params[:id]) 
  end

  def task_params
    params.require(:task).permit(:title, :description, :due_date, :status)
  end
end
