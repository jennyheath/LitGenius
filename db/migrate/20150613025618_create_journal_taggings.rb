class CreateJournalTaggings < ActiveRecord::Migration
  def change
    create_table :journal_taggings do |t|
      t.integer :paper_id, null: false
      t.integer :journal_id, null: false

      t.timestamps null: false
    end
  end
end
