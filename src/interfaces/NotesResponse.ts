import { Note } from "./Note";

export interface NotesResponse {
    user: string;
    notes: Note[]
}