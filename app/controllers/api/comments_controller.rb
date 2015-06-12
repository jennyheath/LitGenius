class Api::CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.assign_attributes(author_id: current_user.id)

    if @comment.save
      render json: @comment
      # flash[:notices] = ["Comment saved!"] # TODO: make flash[:notices]
    else
      flash[:errors] = @comment.errors.full_messages
      render :new # TODO: verify correct
    end
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type)
  end
end
