import { SurfMap } from '.';

export interface FinderPost {
    id: number;
    team: number[];
    teamSize: number;
    time: Date;
    maps: SurfMap[];
    mapIds: number[];
}
