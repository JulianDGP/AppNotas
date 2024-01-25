import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.interface';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {
  user: any;
  notes: any[] = [];

  constructor(private notesService: NotesService, private currentUserService: CurrentUserService) { }
 
  ngOnInit(): void {
     this.user = this.currentUserService.getUser();
     const userId = this.user.id;
     if (userId > 0) {
       this.notesService.getArchivedNotes(userId).subscribe(
         (response: Note[]) => {
           this.notes = response;
         },
         (error) => {
           console.error('Error al obtener las notas archivadas:', error);
         }
       );
     }
  }

  getButtonColor(index: number): string { 
    const colors = ['btn-primary','btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark'];
    return colors[index % colors.length]; 
 }
 }
