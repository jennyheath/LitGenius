class Paper < ActiveRecord::Base
  include Commentable

  validates :body, :author_id, presence: true
  validates :title, presence: true, uniqueness: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many :annotations
  # has_many :comments, as: :commentable
end
