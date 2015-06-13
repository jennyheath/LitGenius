class CreateAuthorTaggings < ActiveRecord::Migration
  def change
    create_table :author_taggings do |t|
      t.integer :paper_id, null: false
      t.integer :author_id, null: false

      t.timestamps null: false
    end
  end
end
