import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { LoginService } from 'src/app/service/login.service';
import { NotesService } from 'src/app/service/notes.service';
import { TagsService } from 'src/app/service/tags.service';
import { Tag } from 'src/app/models/tag.interface';
import { Note } from 'src/app/models/note.interface';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
 user: any;
 notes: any[] = [];
 tags: any[] = [];
 selectedTag: string = '';

 constructor(private notesService: NotesService, private tagsService: TagsService, private currentUserService: CurrentUserService) { }

 getButtonColor(index: number): string { 
    const colors = ['btn-primary','btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark'];
    return colors[index % colors.length]; 
 }

 getNotesByTag(tagName: string): void {
    this.user = this.currentUserService.getUser();
    const userId = this.user.id;
    if (userId > 0) {
      this.notesService.getNotesByTag(userId, tagName).subscribe(
        (response: Note[]) => {
          this.notes = response;
        },
        (error) => {
          console.error('Error al obtener las notas:', error);
        }
      );
    }
 }

 ngOnInit(): void {
    this.tagsService.getAllTags().subscribe(
      (response) => {
        this.tags = response;
      },
      (error) => {
        console.error('Error al obtener las etiquetas:', error);
      }
    );

    this.user = this.currentUserService.getUser();
    const userId = this.user.id;
    if (userId > 0) {
      this.notesService.getNotes(userId).subscribe(
        (response: Note[]) => {
          this.notes = response;
        },
        (error) => {
          console.error('Error al obtener las notas:', error);
        }
      );
    }
 }
}
