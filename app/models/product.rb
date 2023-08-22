class Product < ApplicationRecord
  belongs_to :category

  validates :name, presence: true, uniqueness: { scope: :category_id }
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :sale_price, numericality: { less_than: :price }, allow_blank: true
end
