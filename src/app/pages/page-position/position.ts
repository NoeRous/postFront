import { PositionType } from "../page-postulation/Postulation";

export interface Position {
    id:number;
    name: string;
    description:string;
    t_par_position_type:PositionType
}
