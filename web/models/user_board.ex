defmodule Trello.UserBoard do
  use Trello.Web, :model

  schema "user_boards" do
    belongs_to :user, Trello.User
    belongs_to :board, Trello.Board

    timestamps()
  end

  @required_fields ~w(user_id board_id)
  @optional_fields ~w()

  @doc """
  Builds a changeset based on the `model` and `params`.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:user_id, name: :users_boards_user_id_board_id_index)
  end
end
