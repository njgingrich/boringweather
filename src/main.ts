import {parse, printf, colors} from './deps.ts';
import {TypeOptions} from './types.ts';
import {getForecast} from './api.ts';

function getOptions(cliArgs: string[]): TypeOptions {
    const {lat, long, office, x, y} = parse(cliArgs, { string: ["lat", "long", "x", "y"] });

    if (lat && long) {
        return {mode: 'latlong', location: {lat, long}};
    } else if (office && x && y) {
        return {mode: 'point', location: {office, x, y}};
    } else {
        throw new Error('Unallowed set of arguments passed: must be {lat,long} or {office,x,y}.');
    }
}

function displayForecast(forecast: TypeForecast) {
    for (const period of forecast.periods) {
        printf(`%18-s${colors.bold('%d %s')} - %s\n`, period.name, period.temperature, period.temperatureUnit, period.shortForecast);
    }
}

async function main(cliArgs: string[]) {
    const opts = getOptions(cliArgs);
    const forecast = await getForecast(opts);

    displayForecast(forecast);
}

if (import.meta.main) {
    main(Deno.args);
}
