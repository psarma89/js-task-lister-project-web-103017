class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :priority
  belongs_to :list
end
