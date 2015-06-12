Rails.application.routes.draw do
  root 'static_pages#root'
  get 'sessions/guest_login' => 'sessions#guest_login', as: :guest_login_url

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :papers
    resources :annotations
    resources :comments
  end
end
