import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.interface';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { NotesService } from 'src/app/service/notes.service';
import { Tag } from 'src/app/models/tag.interface';
import { TagsService } from 'src/app/service/tags.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  noteForm: FormGroup;
  user: any;
  allTags: Tag[] = [];
  selectedTags: Tag[] = [];

  constructor(private formBuilder: FormBuilder, private notesService: NotesService,
     private router: Router, private currentUserService: CurrentUserService, private tagsService:TagsService ) {
      this.noteForm = this.formBuilder.group({
          title: ['', Validators.required],
          content: ['', Validators.required],
          tags: [[]] // Initialize as an empty array
      });
  }
  ngOnInit(): void {
    this.tagsService.getAllTags().subscribe((tags: Tag[]) => this.allTags = tags);
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
        this.user = this.currentUserService.getUser();
        const userId = this.user.id;
        const newNote: Note = this.noteForm.value;
        newNote.tags = this.noteForm.controls['tags'].value;
        // Call the service to create a new note
        this.notesService.createNote(userId, newNote).subscribe({
            next: (note) => {
                // Handle successful creation
                this.router.navigate(['/notes']);
            },
            error: (err) => {
                // Handle error
                console.error(err);
            }
        });
    }
}

}
