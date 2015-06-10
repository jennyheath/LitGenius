class RemoveIsAuthorColumn < ActiveRecord::Migration
  def change
    remove_column :users, :is_author
  end
end
