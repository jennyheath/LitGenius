class CreateFieldTaggings < ActiveRecord::Migration
  def change
    create_table :field_taggings do |t|
      t.integer :paper_id, null: false
      t.integer :field_id, null: false

      t.timestamps null: false
    end
  end
end
