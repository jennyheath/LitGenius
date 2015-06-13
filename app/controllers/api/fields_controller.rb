class FieldsController < ApplicationController
  def new
    @field = Field.new
  end

  def create
    @field = Field.new(field_params)
    if @field.save
      render json: @field
    else
      render json: @field.errors.full_messages
    end
  end

  private
  def field_params
    params.require(:field).permit(:name)
  end
end
