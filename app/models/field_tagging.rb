class FieldTagging < ActiveRecord::Base
  validates :paper_id, :field_id, presence: true

  has_many :papers
  has_many :fields
end
