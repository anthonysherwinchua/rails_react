Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index, :create, :update, :show, :destroy]
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
