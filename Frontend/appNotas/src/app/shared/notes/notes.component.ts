import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { LoginService } from 'src/app/service/login.service';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  user: any;
  notes: any[] = [];

  constructor(private notesService: NotesService, private currentUserService: CurrentUserService) { }
  getButtonColor(index: number): string { 
  const colors = ['btn-primary','btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark'];
  return colors[index % colors.length]; 
}
  ngOnInit(): void {
    this.user = this.currentUserService.getUser();
    const userId = this.user.id;
    if (userId) {
      this.notesService.getNotes(userId).subscribe(
        (response) => {
          this.notes = response;
        },
        (error) => {
          console.error('Error al obtener las notas:', error);
        }
      );
    }
  }
}
