export type CitiMap = {
    [key: string]: string[] // key is country name, value is array of cities
}

let cities: CitiMap = {};

export const getCitiesData = async (): Promise<CitiMap> => {
    if (cities && Object.keys(cities).length > 0) {
        return Promise.resolve(cities);
    }

    const response = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await response.json();

    const citiesMap: CitiMap = {};
    data.data.forEach((country: any) => {
        citiesMap[country.country] = country.cities;
    });
    cities = citiesMap;
    return citiesMap;
};
