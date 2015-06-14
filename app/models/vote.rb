class Vote < ActiveRecord::Base
  validates :user_id, :comment_id, :value, presence: true

  belongs_to :users
  belongs_to :comments
end
