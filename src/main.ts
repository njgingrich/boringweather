import { parse, printf, colors, date } from "./deps.ts";
import { TypeOptions, TypeMode, TypeForecast } from "./types.d.ts";
import { getForecast } from "./api.ts";

function getOptions(cliArgs: string[]): TypeOptions {
    const { mode: cliMode, h, w, n, lat, long, office, x, y } = parse(cliArgs, {
        string: ["lat", "long", "x", "y"],
    });

    let mode = cliMode;
    if (mode) {
        if (mode !== 'hourly' && mode !== 'weekly' && mode !== 'now') {
            throw new Error(`Unknown mode set: ${mode}. Must be one of {hourly,weekly,now}.`);
        }
    } else {
        if (h) {
            mode = 'hourly';
        } else if (w) {
            mode = 'weekly';
        } else if (n) {
            mode = 'now';
        } else {
            mode = 'weekly'; // default
        }
    }

    if (lat && long) {
        return { mode, location: { mode: "latlong", lat, long } };
    } else if (office && x && y) {
        return { mode, location: { mode: "point", office, x, y } };
    } else {
        throw new Error(
            "Unallowed set of arguments passed: must be {lat,long} or {office,x,y}."
        );
    }
}

function displayWeeklyForecast(forecast: TypeForecast) {
    if (!forecast.periods || forecast.periods.length === 0) {
        printf('No forecast found.');
    }
    for (const period of forecast.periods) {
        printf(
            `%18-s${colors.bold("%d %s")} - %s\n`,
            period.name,
            period.temperature,
            period.temperatureUnit,
            period.shortForecast
        );
    }
}

function displayHourlyForecast(forecast: TypeForecast) {
    if (!forecast.periods || forecast.periods.length === 0) {
        printf("No forecast found.");
    }

    for (const period of forecast.periods.slice(0, 12)) {
        const hour = date.format(new Date(period.startTime), "h:mm a");
        printf(
            `%8s\t${colors.bold("%d %s")} - %s\n`,
            hour,
            period.temperature,
            period.temperatureUnit,
            period.shortForecast
        );
    }
}

function displayNowForecast(forecast: TypeForecast) {
    const period = forecast.periods[0];
    printf(`${colors.bold("%d %s")} - %s\n`, period.temperature, period.temperatureUnit, period.shortForecast);
}

function displayForecast(forecast: TypeForecast, mode: TypeMode) {
    if (mode === 'hourly') {
        return displayHourlyForecast(forecast);
    } else if (mode === 'weekly') {
        return displayWeeklyForecast(forecast);
    } else if (mode === 'now') {
        return displayNowForecast(forecast);
    }
}

async function main(cliArgs: string[]) {
    const opts = getOptions(cliArgs);
    const forecast = await getForecast(opts);

    displayForecast(forecast, opts.mode);
}

if (import.meta.main) {
    main(Deno.args);
}
