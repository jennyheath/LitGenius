class Institution < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :papers

  def self.find_or_create(name)
    institution = Institution.find_by(name: name)
    if !institution
      institution = Institution.create!(name: name)
    end
    return institution
  end
end
