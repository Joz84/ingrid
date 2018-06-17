class Book < ApplicationRecord
  validates :token, presence: true
  validates :token, uniqueness: true
  validates :title, presence: true
  validates :title, uniqueness: true
  has_one_attached :cover

  def metas
    MetaInspector.new("https://payhip.com/b/#{token}")
  rescue => e
    errors.add(:base, e.message)
    false
  end

end
