class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :author_id, null: false
      t.integer :paper_id, null: false
      t.text :body, null: false
      t.integer :start_index, null: false
      t.integer :end_index, null: false

      t.timestamps null: false
    end

    add_index :annotations, :paper_id
  end
end
