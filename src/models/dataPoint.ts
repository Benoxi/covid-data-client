export default interface DataPoint {
    id: number,
    country: string,
    cases: number,
    todayCases: number,
    dead: number,
    todayDead: number,
    recovered: number,
    active: number,
    critical: number
};