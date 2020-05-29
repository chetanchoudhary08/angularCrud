import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {Task} from "../../model/task.model";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task: Task;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let taskId = window.localStorage.getItem("EditTaskId");
    if(!taskId) {
      alert("Invalid action.")
      this.router.navigate(['list-task']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.apiService.getTaskById(taskId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    let taskId = window.localStorage.getItem("EditTaskId");
    if(!taskId) {
      alert("Invalid action.")
      this.router.navigate(['list-task']);
      return;
    }
    this.apiService.updateTask(this.editForm.value, taskId)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate(['list-task']);
        },
        error => {
          alert(error);
        });
  }

}
