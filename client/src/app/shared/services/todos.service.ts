import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Todo} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todo')
  }

  update(todo: Todo) {
    return this.http.patch(`/api/todo/${todo._id}`, todo)
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('/api/todo', todo)
  }

  delete(todo: Todo): Observable<Message> {
    return this.http.delete<Message>(`/api/todo/${todo._id}`)
  }
}
