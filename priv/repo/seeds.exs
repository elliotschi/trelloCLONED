# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Trello.Repo.insert!(%Trello.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Trello.{Repo, User}

[
  %{
    first_name: "William",
    last_name: "Lee",
    email: "william93lee@gmail.com",
    password: "william123"
  }
]
|> Enum.map(&User.changeset(%User{}, &1))
|> Enum.each(&Repo.insert(&1))