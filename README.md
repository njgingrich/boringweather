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

## Options

### lat, long

Pair of options required to determine location. Latitude and longitude, respectively.

### office, x, y

Trio of options alternately required to determine location. Office refers to an NWS Office, X and Y are locations
on the forecast grid. What is the forecast grid? Here's from the [NWS API docs](https://www.weather.gov/documentation/services-web-api):

> Forecasts are divided into 2.5km grids. Each NWS office is responsible for a section of the grid. The API endpoint for the forecast at a specific grid is: `https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast`

### mode

Can be `hourly`, `weekly`, or `now`. Alternately, `-h`, `-w`, or `-n` can be passed instead of `--mode`.

## Output

Example output:

```text
➜ boringweather --office=LOT -x=73 -y=76
This Afternoon    65 F - Partly Sunny
Tonight           47 F - Slight Chance Showers And Thunderstorms then Partly Cloudy
Friday            51 F - Sunny
Friday Night      44 F - Mostly Clear
Saturday          80 F - Sunny
Saturday Night    58 F - Partly Cloudy
Sunday            80 F - Partly Sunny then Chance Showers And Thunderstorms
Sunday Night      55 F - Showers And Thunderstorms Likely
Monday            59 F - Rain Showers Likely
Monday Night      46 F - Rain Showers Likely
Tuesday           53 F - Chance Rain Showers
Tuesday Night     46 F - Chance Rain Showers
Wednesday         55 F - Slight Chance Rain Showers
Wednesday Night   46 F - Slight Chance Rain Showers
```
