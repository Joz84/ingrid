class Order < ApplicationRecord
  belongs_to :book
  monetize :amount_cents
end
