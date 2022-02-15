import { SurfMap } from '.';

export interface Match {
    id: number;
    team0: number[];
    team1: number[];
    teamSize: number;
    time: Date;
    maps: SurfMap[];
    mapIds: number[];
    result0: number[];
    result1: number[];
    isDisputed: boolean;
    result: number;
}
