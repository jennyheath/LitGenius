class Field < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :field_taggings
  has_many :papers, through: :field_taggings
end
