class Journal < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :journal_taggings
  has_many :papers, through: :journal_taggings
end
