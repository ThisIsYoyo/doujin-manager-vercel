import { AuthorType } from "../Author/Author.type";
import { CircleType } from "../Circle/Circle.type";

export type DoujinType = {
    id: number;
    name: string;
    author?: AuthorType;
    circle?: CircleType;
    author_id?: number;
    circle_id?: number;
    origin_language: string;
    present_language: string;
    buy_way?: string;
    buy_time?: string;
    price?: number;
    price_currency?: string;
    record_time?: string;
}
