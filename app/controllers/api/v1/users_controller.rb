class Api::V1::UsersController < ApplicationController
  def me
    current_user = User.find_by email: params[:email]

    render json: ::UserSerializer.new(current_user).as_json, status: :ok
  end
end
