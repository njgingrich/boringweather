import { TypeForecast, TypeLocation, TypeOptions } from "./types.d.ts";

const headers = new Headers({
    "User-Agent": "(boringweather-cli, njgingrich@gmail.com)",
});

async function getBaseURLFromLocation(location: TypeLocation): Promise<string> {
    if (location.mode === "point") {
        const { office, x, y } = location;
        return `https://api.weather.gov/gridpoints/${office}/${x},${y}`;
    }

    try {
        const { lat, long } = location;
        const json = await fetch(
            `https://api.weather.gov/points/${lat},${long}`,
            {
                headers,
            }
        ).then((res) => res.json());
        return json.properties.forecastGridData as string;
    } catch {
        throw new Error("Unable to get point from location.");
    }
}

export async function getForecast(options: TypeOptions): Promise<TypeForecast> {
    const baseUrl = await getBaseURLFromLocation(options.location);
    const json = await fetch(
        `${baseUrl}/forecast${options.mode === "hourly" ? "/hourly" : ""}`
    ).then((res) => res.json());
    return json.properties as TypeForecast;
}
