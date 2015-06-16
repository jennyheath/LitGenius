class Author < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :author_taggings
  has_many :papers, through: :author_taggings, source: :paper

  def self.find_or_create(name)
    author = Author.find_by(name: name)
    if !author
      author = Author.create!(name: name)
    end
    return author
  end
end
