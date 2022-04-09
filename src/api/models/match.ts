import { SurfMap } from '.';

export interface Match {
    id: number;
    team0: number[];
    team1: number[];
    team0Names: string[];
    team1Names: string[];
    teamSize: number;
    time: Date;
    maps: SurfMap[];
    mapIds: number[];
    result0: number[];
    result1: number[];
    isDisputed: boolean;
    result: number;
}
