defmodule Trello.List do
  use Trello.Web, :model

  @derive {Poison.Encoder, only: [:id, :board_id, :name, :cards]}


  schema "lists" do
    field :name, :string
    belongs_to :boards, Trello.Board
    has_many :cards, Trello.Card

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  @required_fields ~w(name)
  @optional_fields ~w()

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
