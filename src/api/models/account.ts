export interface Account {
    id: number;
    username: string;
    email: string;
    finderPostIds: number[];
    win: number;
    loss: number;
    disputes: number;
    steamId: number;
    createDate: Date;
}
