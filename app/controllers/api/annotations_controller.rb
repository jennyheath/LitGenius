class Api::AnnotationsController < ApplicationController
  before_action :require_signed_in!

  def new
    @annotation = Annotation.new
  end

  def create
    @annotation = Annotation.new(annotation_params)
    @annotation.assign_attributes(author_id: current_user.id)
    if @annotation.save
      render json: @annotation
    else
      flash[:errors] = @annotation.errors.full_messages
      render :new
    end
  end

  private
  def annotation_params
    params.require(:annotation).permit(:author_id, :paper_id, :body, :start_index, :end_index)
  end
end
