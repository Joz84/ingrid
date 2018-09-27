class Order < ApplicationRecord
  belongs_to :book
  has_one_attached :pdf
  monetize :amount_cents

  def downloadable_pdf?
    downloadable_pdf
  end
end
