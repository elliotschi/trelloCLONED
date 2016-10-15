defmodule Trello.UserChannel do
  use Trello.Web, :channel

  def join("users:" <> user_id, _params, socket) do
    {:ok, socket}
  end
end