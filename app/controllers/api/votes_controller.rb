class Api::VotesController < ApplicationController
  def new
    @vote = Vote.new
  end

  def create
    @vote = Vote.new(vote_params)
    if @vote.save
      render :show
      # render json: @vote
    else
      render json: @vote.errors.full_messages
    end
  end

  def index
    @votes = Vote.all
  end

  def edit
    @vote = Vote.find(params[:id])
  end

  def update
    @vote = Vote.find(params[:id])
    if @vote.update(vote_params)
      # render :show
      render json: @vote
    else
      render json: @vote.errors.full_messages
    end
  end

  private
  def vote_params
    params.require(:vote).permit(:user_id, :comment_id, :value)
  end
end
