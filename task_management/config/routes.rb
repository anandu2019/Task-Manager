Rails.application.routes.draw do

  root 'static#index' # Serve React for the root path

  # Fallback for all other paths (React handles routing)
  get '*path', to: 'static#index', constraints: ->(req) { !req.xhr? && req.format.html? }

 
  # For tasks-related endpoints
  resources :tasks, only: [:index, :create, :update, :destroy]

  # Optionally, define routes for user authentication (sign up, login, etc.)
  # You can use a gem like Devise or implement your own
  post '/signup', to: 'users#signup'
  post '/login', to: 'users#login'
end

