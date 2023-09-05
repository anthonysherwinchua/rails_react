class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :jti
end