class Journal < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :papers

  def self.find_or_create(name)
    journal = Journal.find_by(name: name)
    if !journal
      journal = Journal.create!(name: name)
    end
    return journal
  end
end
