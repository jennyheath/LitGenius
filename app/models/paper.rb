class Paper < ActiveRecord::Base
  include Commentable

  validates :body, :user_id, presence: true
  validates :title, presence: true, uniqueness: true

  belongs_to :user

  has_many :annotations, dependent: :destroy
  # has_many :comments, as: :commentable
end
