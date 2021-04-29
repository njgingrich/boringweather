import { TypeForecast, TypeOptions } from "./types.ts";

const headers = new Headers({
  "User-Agent": "(boringweather-cli, njgingrich@gmail.com)",
});

async function getBaseURLFromLocation(options: TypeOptions): Promise<string> {
  if (options.mode === "point") {
    const { office, x, y } = options.location;
    return `https://api.weather.gov/gridpoints/${office}/${x},${y}`;
  }

  try {
    const { lat, long } = options.location;
    const json = await fetch(`https://api.weather.gov/points/${lat},${long}`, {
      headers,
    }).then((res) => res.json());
    return json.properties.forecastGridData as string;
  } catch {
    throw new Error("Unable to get point from location.");
  }
}

export async function getForecast(opts: TypeOptions): Promise<TypeForecast> {
  const baseUrl = await getBaseURLFromLocation(opts);
  const json = await fetch(`${baseUrl}/forecast`).then((res) => res.json());
  return json.properties as TypeForecast;
}
