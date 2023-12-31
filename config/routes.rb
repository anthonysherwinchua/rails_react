Rails.application.routes.draw do
  scope :api, module: :api do
    devise_for :users, path: '', path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'api/users/sessions',
      registrations: 'api/users/registrations'
    }
  end

  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index, :create, :update, :show, :destroy]
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
