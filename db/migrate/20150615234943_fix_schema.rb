class FixSchema < ActiveRecord::Migration
  def change
    rename_column :papers, :author_id, :user_id
    drop_table :field_taggings
    drop_table :institution_taggings
    drop_table :journal_taggings
    add_column :papers, :journal_id, :integer
    add_column :papers, :field_id, :integer
    add_column :papers, :institution_id, :integer
  end
end
