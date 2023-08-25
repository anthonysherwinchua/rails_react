class AddTagToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :tag, :string
  end
end
