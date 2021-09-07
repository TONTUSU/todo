import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Todo} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient, @Inject('TODO_API') private todoUrl: string) {
  }

  fetch(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl)
  }

  update(todo: Todo) {
    return this.http.patch(`${this.todoUrl}/${todo._id}`, todo)
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo)
  }

  delete(todo: Todo): Observable<Message> {
    return this.http.delete<Message>(`${this.todoUrl}/${todo._id}`)
  }
}
