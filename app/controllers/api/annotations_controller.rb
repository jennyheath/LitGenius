class Api::AnnotationsController < ApplicationController
  before_action :require_signed_in!

  def new
    @annotation = Annotation.new
  end

  def create
    @annotation = Annotation.new(annotation_params)
    @annotation.assign_attributes(user_id: current_user.id)
    if @annotation.save
      render :show
    else
      render json: @paper.errors.full_messages, status: 402
    end
  end

  def show
    @annotation = Annotation.includes(comments: :user).find(params[:id])
    @comments = Comment.find_by_sql ["SELECT
                                      comments.*, SUM(votes.value) AS vote_count
                                      FROM
                                      comments
                                      LEFT OUTER JOIN
                                      votes ON votes.comment_id = comments.id
                                      WHERE
                                      comments.commentable_type = 'Annotation' AND comments.commentable_id = ?
                                      GROUP BY
                                      comments.id, comments.body",
                                      params[:id]]
    @comments.each do |comment|
      if comment.vote_count.nil?
        comment.vote_count = 0
      end
    end
    @comments.sort! { |a, b| b.vote_count <=> a.vote_count }
    render :show
  end

  def destroy
    @annotation = Annotation.find(params[:id])
    @annotation.delete
    render json: {}
  end

  private
  def annotation_params
    params.require(:annotation).permit(:user_id, :paper_id, :body, :start_index, :end_index)
  end
end
