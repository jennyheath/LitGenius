class Api::PapersController < ApplicationController
  before_action :require_signed_in!

  def new
    @paper = Paper.new
  end

  def create
    @paper = Paper.new(paper_params)
    @paper.assign_attributes(author_id: current_user.id)

    if @paper.save
      render json: @paper
    else
      flash.now[:errors] = @paper.errors.full_messages
      render :new
    end
  end

  def show
    @paper = Paper.find(params[:id])
  end

  private
  def paper_params
    params.require(:paper).permit(:title, :body, :author_id)
  end
end
