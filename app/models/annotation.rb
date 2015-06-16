class Annotation < ActiveRecord::Base
  include Commentable

  validates :user_id, :paper_id, :body, :start_index, :end_index, presence: true

  belongs_to :user

  belongs_to :paper
  # has_many :comments, as: :commentable
end
