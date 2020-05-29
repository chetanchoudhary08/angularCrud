import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Task} from "../../model/task.model";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {


  response: any;

  constructor(private router: Router, private apiService: ApiService) { }

  tasks: Task[] = [];

  ngOnInit() {
    this.apiService.getTasks()
      .subscribe( data => {
        Object.keys(data).map((index) => {
          let temp = data[index];
          temp.id = index;
          this.tasks.push(temp);
       });
      });
  }



  deleteTask(task: Task): void {
    this.apiService.deleteTask(task.id)
      .subscribe( data => {
        this.tasks = this.tasks.filter(u => u !== task);
      });
  };

  EditTask(task: Task): void {
    window.localStorage.removeItem("EditTaskId");
    window.localStorage.setItem("EditTaskId", task.id.toString());
    this.router.navigate(['edit-task']);
  };

  AddTask(): void {
    this.router.navigate(['add-task']);
  };
}
