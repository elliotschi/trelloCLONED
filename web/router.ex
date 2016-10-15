defmodule Trello.Router do
  use Trello.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]

    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Trello do
    pipe_through :api
    
    scope "/v1" do
      post "/registrations", RegistrationController, :create

      post "/sessions", SessionController, :create
      delete "/sessions", SessionController, :delete

      resources "/boards", BoardController, only: [:index, :create]
      
      get "/current_user", CurrentUserController, :show
    end
  end

  scope "/", Trello do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end
end
