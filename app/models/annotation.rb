class Annotation < ActiveRecord::Base
  validates :author_id, :paper_id, :body, :start_index, :end_index, presence: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to :paper
end
