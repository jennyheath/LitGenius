class PapersController < ApplicationController
  before_action :require_signed_in!

  def new
    @paper = Paper.new
  end

  def create
    @paper = Paper.new(paper_params)

    if @paper.save
      redirect_to api_paper_url
    else
      flash.now[:errors] = @paper.errors.full_messages
      render :new
    end
  end

  def show
    @paper = Paper.find(paarams[:id])
  end

  private
  def paper_params
    params.require(:paper).permit(:title, :body, :author_id)
  end
end
