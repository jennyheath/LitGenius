class Api::AuthorTaggingsController < ApplicationController
  def new
    @author_tagging = AuthorTagging.new
  end

  def create
    @author_tagging = AuthorTagging.new(author_tagging_params)
    if @author_tagging.save
      render json: @author_tagging
    else
      render json: @author_tagging.errors.full_messages
    end
  end

  private
  def author_tagging_params
    params.require(:author_tagging).permit(:paper_id, :author_id)
  end
end
