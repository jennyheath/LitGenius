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
      render json: @paper.errors.full_messages, status: 402
    end
  end

  def index
    if params[:search]
      search_title = params[:search]
      @papers = Paper.where("title LIKE ?", "%#{search_title}%")
      render json: @papers
    end
  end

  def show
    @paper = Paper.includes(comments: :author, annotations: :author).find(params[:id])
  end

  private
  def paper_params
    params.require(:paper).permit(:title, :body, :author_id)
  end
end
