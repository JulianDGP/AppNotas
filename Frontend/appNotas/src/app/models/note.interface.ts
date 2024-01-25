import { Tag } from "./tag.interface";
export interface Note {
    id: Number;
    title: string;
    content: string;
    tags: Tag[];
    // ... otros campos de la nota
   }