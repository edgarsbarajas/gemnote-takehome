class Product < ApplicationRecord
  validates :title, :color, :size, :cost, :product_shot, presence: true
  validates :cost, numericality: true
end
