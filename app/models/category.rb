class Category < ApplicationRecord
  has_many :products

  validates :name, presence: true, uniqueness: true
  validates :tag, presence: true, uniqueness: true
end
