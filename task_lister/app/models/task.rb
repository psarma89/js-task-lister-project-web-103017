class Task < ApplicationRecord
  belongs_to :list
  validates :description, :priority, :list_id, presence: :true
end
