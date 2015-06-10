class CreatePapers < ActiveRecord::Migration
  def change
    create_table :papers do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :author_id, null: false

      t.timestamps null: false
    end

    add_index :papers, :title, unique: true
  end
end
