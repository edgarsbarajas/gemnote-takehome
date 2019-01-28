class Customer < ApplicationRecord
  validates :name, :logo, presence: true
end
