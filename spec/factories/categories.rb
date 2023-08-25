FactoryBot.define do
  factory :category do
    sequence(:name) {|i| "Category ##{i}"}
    sequence(:tag) {|i| "Tag ##{i}"}
  end
end