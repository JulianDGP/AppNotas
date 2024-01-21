import { Tag } from "./tag.interface";
export interface Note {
    title: string;
    content: string;
    tags: Tag[];
    // ... otros campos de la nota
   }