import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.interface';
import { Tag } from 'src/app/models/tag.interface';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { NotesService } from 'src/app/service/notes.service';
import { TagsService } from 'src/app/service/tags.service';

@Component({
    selector: 'app-edit-note',
    templateUrl: './edit-note.component.html',
    styleUrls: ['./edit-note.component.css']
}) export class EditNoteComponent implements OnInit {

    noteForm: FormGroup;
    user: any;
    //allTags: Tag[] = [];
    selectedTags: Tag[] = [];
    noteId!: number;
    notes: Note[] = [];

    constructor(private formBuilder: FormBuilder, private notesService: NotesService,
        private router: Router, private currentUserService: CurrentUserService, private tagsService: TagsService,
        private route: ActivatedRoute) {
        this.noteForm = this.formBuilder.group({
            noteId: [''],
            title: ['', Validators.required],
            content: ['', Validators.required],
            //tags: [[]]
        });
    }

    ngOnInit(): void {
        //this.tagsService.getAllTags().subscribe((tags: Tag[]) => this.allTags = tags);
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
        this.noteForm.patchValue(selectedNote);
        this.selectedTags = selectedNote.tags;
        this.noteId = Number(noteId); // Establece noteId cuando seleccionas una nota

        // Actualiza los tags seleccionados en el formulario
        //this.noteForm.controls['tags'].setValue(this.selectedTags);
    }

    onSubmit(): void {
        if (this.noteForm.valid) {
            const updatedNote: Note = this.noteForm.value;
            this.user = this.currentUserService.getUser();
            const userId = this.user.id;
            //updatedNote.tags = this.noteForm.controls['tags'].value;
            if (this.noteId !== undefined) {
                // Call the service to update the note
                this.notesService.updateNote(userId, this.noteId, updatedNote).subscribe({
                    next: (note) => {
                        // Handle successful update
                        this.router.navigate(['/notes']);
                    },
                    error: (err) => {
                        // Handle error
                        console.error(err);
                    }
                });
            } else {
                console.error('noteId es undefined');
            }
        }
    }
}
