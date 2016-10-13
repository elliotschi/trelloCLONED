# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :trello,
  ecto_repos: [Trello.Repo]

# Configures the endpoint
config :trello, Trello.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "+IglBKXCKJNocpgfvAzTXoib1QYs3xLPBzv1IFA/E3AeWpYWnjKJ4B5cfIYSHLcf",
  render_errors: [view: Trello.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Trello.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  issuer: "Trello",
  ttl: { 3, :days },
  verify_issuer: true,
  secret_key: "who needs a secret key",
  serializer: Trello.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
