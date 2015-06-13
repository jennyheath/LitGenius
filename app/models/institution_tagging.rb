class InstitutionTagging < ActiveRecord::Base
  validates :paper_id, :institution_id, presence: true

  has_many :papers
  has_many :institutions
end
