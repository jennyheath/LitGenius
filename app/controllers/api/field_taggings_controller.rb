class FieldTaggingsController < ApplicationController
  def new
    @field_tagging = Field.new
  end

  def create
    @field_tagging = Field.new(field_tagging_params)
    if @field_tagging.save
      render json: @field_tagging
    else
      render json: @field_tagging.errors.full_messages
    end
  end

  private
  def field_tagging_params
    params.require(:field_tagging).permit(:paper_id, :field_id)
  end
end
