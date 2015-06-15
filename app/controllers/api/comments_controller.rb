class Api::CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.assign_attributes(author_id: current_user.id)

    if @comment.save
      render json: @comment
      # render :show?
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @comment = Comment.find(params[:id])
    @vote_count = 0
    @comment.votes.each do |vote|
      @vote_count += vote.value
    end
  end

  def downvote; vote(-1); end
  def upvote; vote(1); end

  private
  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type)
  end

  def vote(direction)
    @comment = Comment.find(params[:id])
    @vote = Vote.find_by(
      comment_id: @comment.id, user_id: current_user.id
    )

    if @vote
      @vote.update(value: direction)
    else
      Vote.create!(
        user_id: current_user.id, value: direction, comment_id: @comment.id
      )
    end

    render json: @comment
  end
end
