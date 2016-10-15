defmodule Trello.IntegrationCase do
  use ExUnit.CaseTemplate
  use Hound.Helpers

  using do
    quote do
      use Hound.Helpers

      import Ecto, only: [build_assoc: 2]
      import Ecto.Model
      import Ecto.Query, only: [from: 2]
      import Trello.Router.Helpers
      import Trello.Factory
      import Trello.IntegrationCase

      alias Trello.Repo

      @endpoint Trello.Endpoint

      hound_session
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Trello.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Trello.Repo, {:shared, self()})
    end
    :ok
  end
end