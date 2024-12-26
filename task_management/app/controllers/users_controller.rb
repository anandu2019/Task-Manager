
class UsersController < ApplicationController
    SECRET_KEY = Rails.application.secrets.secret_key_base || 'my$ecretK3y'
    # POST /signup
    def signup
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    # POST /login
    def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          token = generate_token(user.id)
          render json: { token: token, message: 'Login successful' }, status: :ok
        else
          render json: { errors: 'Invalid email or password' }, status: :unauthorized
        end
    end
  
    private
  
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
  
    # Generate JWT token
    def generate_token(user_id)
        payload = { user_id: user_id, exp: 24.hours.from_now.to_i }
        JWT.encode(payload, SECRET_KEY, 'HS256')
    end
  end
  


