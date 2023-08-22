require 'rails_helper'

RSpec.describe Product, type: :model do
  subject { build(:product) }

  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name).scoped_to(:category_id) }
  it { should validate_presence_of(:price) }
  it { should validate_numericality_of(:price).is_greater_than(0) }
  it { should validate_numericality_of(:sale_price).is_less_than(subject.price) }
end
