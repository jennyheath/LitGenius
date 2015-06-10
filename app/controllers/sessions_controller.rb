class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user
      sign_in(user)
      render json: user
    else
      flash.now[:errors] = ["Invalid account information"]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end
end
