class Author < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :author_taggings
  has_many :papers, through: :author_taggings
end
