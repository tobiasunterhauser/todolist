import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksComponent} from "./pages/tasks/tasks.component";
import {NewListComponent} from "./pages/new-list/new-list.component";

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full'},
  { path: 'new-list', component: NewListComponent},
  { path: 'lists', component: TasksComponent},
  { path: 'lists/:listId', component: TasksComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
