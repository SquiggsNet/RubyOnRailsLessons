Rails.application.routes.draw do
  devise_for :users

  resources :customers do
    resources :invoices, only: [:index]
  end

  root 'customers#index'
end
