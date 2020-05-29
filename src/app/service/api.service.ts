import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from "../model/task.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../model/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://tasksmanager-302f5.firebaseio.com/Task/';


  getTasks(): Observable<[]> {
    return this.http.get<[]>('https://tasksmanager-302f5.firebaseio.com/Task.json');
  }

  getTaskById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id + '.json');
  }

  createTask(task: Task): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://tasksmanager-302f5.firebaseio.com/Task.json', task);
  }

  updateTask(task: Task, docId: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + docId + '.json', task);
  }

  deleteTask(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id + '.json');
  }
}
