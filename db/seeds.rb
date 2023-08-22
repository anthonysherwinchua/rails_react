require 'factory_bot_rails'

categories = FactoryBot.create_list(:category, 10)

categories.each do |category|
  1.upto([*0..100].sample).each do |i|
    price = [*10..1000].sample
    sale_price = [price * 0.25, price * 0.5, price * 0.75, price * 0.90, nil].sample

    FactoryBot.create(:product, category: category, price: price, sale_price: sale_price)
  end
end