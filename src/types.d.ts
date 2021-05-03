export type TypeLatLongArgs = {
    lat: string;
    long: string;
};

export type TypePointArgs = {
    office: string;
    x: string;
    y: string;
};

export type TypeLocation =
    | ({ mode: "latlong" } & TypeLatLongArgs)
    | ({ mode: "point" } & TypePointArgs);

export type TypeMode = "weekly" | "hourly" | "now";

export type TypeOptions = {
    mode: TypeMode;
    location: TypeLocation;
};

export type TypeSingleForecast = {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: "F" | "C";
    temperatureTrend: string | null;
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
};

export type TypeForecast = {
    updated: string;
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: {
        value: number;
        unitCode: string;
    };
    periods: TypeSingleForecast[];
};
