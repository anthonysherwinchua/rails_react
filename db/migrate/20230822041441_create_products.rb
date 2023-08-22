class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.references :category
      t.string :name
      t.decimal :price, precision: 8, scale: 4
      t.decimal :sale_price, precision: 8, scale: 4

      t.timestamps
    end

    add_index :products, [:category_id, :name], unique: true
  end
end
