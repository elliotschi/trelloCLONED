defmodule Trello.SignInTest do
  use Trello.IntegrationCase

  alias Trello.User

  def create_user do
   user = %User{first_name: "Luke", last_name: "Skywalker", email: "luke@force.com"}
    |> User.changeset(%{password: "daddyissues"})
    |> Repo.insert!
  end

  def user_sign_in(%{user: user}) do
    navigate_to "/"

    sign_in_form = find_element(:id, "sign_in_form")

    sign_in_form
    |> find_within_element(:id, "user_email")
    |> fill_field(user.email)

    sign_in_form
    |> find_within_element(:id, "user_password")
    |> fill_field(user.password)

    sign_in_form
    |> find_within_element(:css, "button")
    |> click

    assert element_display?({:id, "authentication_container"})
  end

  # setup do
  #   user = %User{first_name: "Luke", last_name: "Skywalker", email: "luke@force.com"}
  #   |> User.changeset(%{password: "daddyissues"})
  #   |> Repo.insert!

  #   {:ok, %{user: user}}
  # end

  @tag :integration
  test "Sign in with existing email and password", %{user: user} do
    user = create_user
    user_sign_in(%{user: user})
    
    assert page_source =~ "#{user.first_name} #{user.last_name}"
    assert page_source =~ "My Boards"
  end
end