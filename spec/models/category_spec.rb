require 'rails_helper'

RSpec.describe Category, type: :model do
  subject { build(:category) }

  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }
  it { should validate_presence_of(:tag) }
  it { should validate_uniqueness_of(:tag) }
end
