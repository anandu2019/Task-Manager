class Task < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :description, presence: true
  validates :due_date, presence: true
  validates :status, inclusion: { in: ['Pending', 'In Progress', 'Completed'] }
end
