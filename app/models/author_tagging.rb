class AuthorTagging < ActiveRecord::Base
  validates :paper_id, :author_id, presence: true

  has_many :papers
  has_many :authors
end
