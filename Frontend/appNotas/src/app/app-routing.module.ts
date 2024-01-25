import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { NotesComponent } from './shared/notes/notes.component';
import { AuthGuard } from './guards/AuthGuard';
import { CreateNoteComponent } from './shared/create-note/create-note.component';
import { EditNoteComponent } from './shared/edit-note/edit-note.component';
import { DeleteNoteComponent } from './shared/delete-note/delete-note.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuard] },
  { path: 'create-note', component: CreateNoteComponent },
  { path: 'edit-note', component: EditNoteComponent },
  { path: 'delete-note', component: DeleteNoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
