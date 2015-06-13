class Api::AnnotationsController < ApplicationController
  before_action :require_signed_in!

  def new
    @annotation = Annotation.new
  end

  def create
    @annotation = Annotation.new(annotation_params)
    @annotation.assign_attributes(author_id: current_user.id)
    if @annotation.save
      render :show
    else
      render json: @paper.errors.full_messages, status: 402
    end
  end

  def show
    @annotation = Annotation.includes(comments: :author).find(params[:id])
  end

  private
  def annotation_params
    params.require(:annotation).permit(:author_id, :paper_id, :body, :start_index, :end_index)
  end
end
