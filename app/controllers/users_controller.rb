class UsersController < ApplicationController
  before_action :require_signed_in!, only: [:show, :edit, :update, :destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    # TODO: make update work
    @user = User.find(params[:id])
    if @user.update!(user_params)
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
