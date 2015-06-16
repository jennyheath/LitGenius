class ChangeAuthortoUserId < ActiveRecord::Migration
  def change
    rename_column :annotations, :author_id, :user_id
    rename_column :comments, :author_id, :user_id
  end
end
