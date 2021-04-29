# Boring Weather

It's not super ergonomic, but it gives you a forecast.

## Installation

First, [install Deno](https://deno.land/#installation).

Then you can install this CLI.

```sh
deno install --allow-net -n boringweather https://raw.githubusercontent.com/njgingrich/boringweather/main/src/main.ts
```

Add `deno` to your path:

```sh
# or ~/.zshrc, or whatever
echo 'export PATH="$HOME/.deno/bin:$PATH"' >> ~/.bashrc
```

## Usage

```sh
boringweather --lat=LAT --long=LONG
boringweather --office=OFFICE -x=X -y=Y
```

The Weather.gov API is super user-friendly. If you want to get your forecast office and X and Y yourself instead of having boringweather do an API call for you, you can request
the API with a lat/long value:

```sh
curl -s https://api.weather.gov/points/{LAT},{LONG} | grep \"grid
```

You can parse out your office (gridId), x, and y from that response.
