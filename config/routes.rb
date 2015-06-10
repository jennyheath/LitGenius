Rails.application.routes.draw do
  root 'static_pages#root'
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :papers
  end
end
