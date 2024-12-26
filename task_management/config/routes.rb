Rails.application.routes.draw do
  # For tasks-related endpoints
  resources :tasks, only: [:index, :create, :update, :destroy]

  # Optionally, define routes for user authentication (sign up, login, etc.)
  # You can use a gem like Devise or implement your own
  post '/signup', to: 'users#signup'
  post '/login', to: 'users#login'
end

