class Api::AuthorsController < ApplicationController
  def new
    @author = Author.new
  end

  def create
    @author = Author.new(author_params)
    if @author.save
      render :show
      # render json: @author
    else
      render json: @author.errors.full_messages
    end
  end

  private
  def author_params
    params.require(:author).permit(:name)
  end
end
