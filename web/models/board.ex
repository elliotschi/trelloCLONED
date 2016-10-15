defmodule Trello.Board do
  use Trello.Web, :model

  @alias __MODULE__

  @derive {Poison.Encoder, only: [:id, :name, :user]}

  schema "boards" do
    field :name, :string
    belongs_to :user, Trello.User

    timestamps()
  end

  @required_fields ~w(name user_id)
  @optional_fields ~w()

  @doc """
  Builds a changeset based on the `model` and `params`.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
