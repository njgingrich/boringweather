type TypeLatLongArgs = {
  lat: string;
  long: string;
};

type TypePointArgs = {
  office: string;
  x: string;
  y: string;
};

type TypeOptions =
  | { mode: "latlong"; location: TypeLatLongArgs }
  | { mode: "point"; location: TypePointArgs };

type TypeSingleForecast = {
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

type TypeForecast = {
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
