class AuthorTagging < ActiveRecord::Base
  validates :paper, :author_id, presence: true

  belongs_to :paper
  belongs_to :author
end
