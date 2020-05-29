import { RouterModule, Routes } from '@angular/router';

import {AddTaskComponent} from "./task/add-task/add-task.component";
import {ListTaskComponent} from "./task/list-task/list-task.component";
import {EditTaskComponent} from "./task/edit-task/edit-task.component";

const routes: Routes = [

  { path: 'add-task', component: AddTaskComponent },
  { path: 'list-task', component: ListTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  {path : '', component : ListTaskComponent}
];

export const routing = RouterModule.forRoot(routes);
