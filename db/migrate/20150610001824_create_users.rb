class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :penname, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.boolean :is_author, null: false

      t.timestamps null: false
    end

    add_index :users, :penname, unique: true
  end
end
