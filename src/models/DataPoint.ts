import DayPoint from './DayPoint';
export default interface DataPoint {
    ID: string,
    Country: string,
    CountryCode: string,
    Data: string,
    TotalConfirmed: number,
    NewConfirmed: number,
    TotalDeaths: number,
    NewDeaths: number,
    TotalRecovered: number,
    NewRecovered: number,
    Slug: string,
    DayOne: Array<DayPoint>
};