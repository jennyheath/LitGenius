class CreateInstitutionTaggings < ActiveRecord::Migration
  def change
    create_table :institution_taggings do |t|
      t.integer :paper_id, null: false
      t.integer :institution_id, null: false

      t.timestamps null: false
    end
  end
end
