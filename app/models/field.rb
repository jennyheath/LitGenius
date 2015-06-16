class Field < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :papers
end
