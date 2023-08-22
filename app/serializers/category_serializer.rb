class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :updated_at

  def created_at
    object.created_at.strftime("%d %B %Y")
  end

  def updated_at
    object.updated_at.strftime("%d %B %Y")
  end
end