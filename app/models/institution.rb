class Institution < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :institution_taggings
  has_many :papers, through: :institution_taggings
end
