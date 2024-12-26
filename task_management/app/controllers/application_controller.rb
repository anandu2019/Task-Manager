class ApplicationController < ActionController::API
    before_action :authenticate_request
  
    attr_reader :current_user
  
    private
  
    def authenticate_request
      token = request.headers['Authorization']&.split(' ')&.last
      decoded_token = decode_token(token)
      @current_user = User.find(decoded_token[:user_id]) if decoded_token
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Unauthorized' }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  
    def decode_token(token)
      return unless token
  
      decoded = JWT.decode(token, UsersController::SECRET_KEY, true, algorithm: 'HS256')
      { user_id: decoded[0]['user_id'] }
    end
  end
