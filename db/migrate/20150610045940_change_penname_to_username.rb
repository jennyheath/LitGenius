class ChangePennameToUsername < ActiveRecord::Migration
  def change
    rename_column :users, :penname, :username
  end
end
