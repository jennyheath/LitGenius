class Paper < ActiveRecord::Base
  include Commentable

  validates :body, :user_id, presence: true
  validates :title, presence: true, uniqueness: true

  belongs_to :user
  belongs_to :institution
  belongs_to :journal
  belongs_to :field

  has_many :annotations, dependent: :destroy
  # has_many :comments, as: :commentable
  has_many :author_taggings
  has_many :authors, through: :author_taggings, source: :author
end
