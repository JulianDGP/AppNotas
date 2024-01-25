import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.interface';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-delete-note',
  templateUrl: './delete-note.component.html',
  styleUrls: ['./delete-note.component.css']
})
export class DeleteNoteComponent implements OnInit {
 noteForm: FormGroup;
 user: any;
 noteId!: number;
 notes: Note[] = [];

 constructor(
    private formBuilder: FormBuilder,
    private notesService: NotesService,
    private router: Router,
    private currentUserService: CurrentUserService
 ) {
    this.noteForm = this.formBuilder.group({
      noteId: ['']
    });
 }

 ngOnInit(): void {
    this.user = this.currentUserService.getUser();
    this.notesService.getNotes(this.user.id).subscribe((notes: Note[]) => {
      this.notes = notes;
    });
 }

 onNoteChange(event: Event): void {
    const noteId = (event.target as HTMLSelectElement).value;
    const selectedNote = this.notes.find(note => note.id === Number(noteId));

    if (!selectedNote) {
      // Nota no encontrada, muestra un mensaje de error
      alert(`La nota con el ID ${noteId} no fue encontrada.`);
      return;
    }

    this.noteId = Number(noteId); // Establece noteId cuando seleccionas una nota
 }

 onDelete(): void {
    if (this.noteId !== undefined) {
      // Llama al servicio para eliminar la nota
      this.notesService.deleteNote(this.user.id, this.noteId).subscribe({
        next: () => {
          // Redirecciona al usuario a la página /notes después de una eliminación exitosa
          this.router.navigate(['/notes']);
        },
        error: (err) => {
          // Maneja el error
          console.error(err);
        }
      });
    } else {
      console.error('noteId es undefined');
    }
 }
}