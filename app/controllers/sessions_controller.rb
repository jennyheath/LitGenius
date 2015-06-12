class SessionsController < ApplicationController
  before_action :require_no_user!, only: [:create, :new]
  before_action :require_signed_in!, only: [:destroy]

  def new
    render :new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      flash.now[:errors] = ["Invalid account information"]
      render :new
    else
      sign_in(user)
      redirect_to root_url
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end

  def guest_login
    user = User.find(1)
    sign_in(user)
    redirect_to root_url
  end
end
