class JournalTagging < ActiveRecord::Base
  validates :paper_id, :journal_id, presence: true

  has_many :papers
  has_many :journals
end
