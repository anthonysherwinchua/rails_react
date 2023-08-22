FactoryBot.define do
  factory :product do
    category { build(:category) }

    sequence(:name) { |i| "Product ##{i}" }
    price { 100 }
    sale_price { nil }

    trait :on_sale do
      sale_price { 75 }
    end
  end
end
