export class CreateCommentaryDTO {
    readonly commentary: string;
    readonly user_id: string[];
    readonly user_name: String[];
    readonly product_id: string[];
    readonly artist_id:string[];
    readonly created_at: Date;
}
