import {Component, OnInit} from '@angular/core';
import {Todo} from "../shared/interfaces";
import {TodosService} from "../shared/services/todos.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {EditTodoDialogComponent} from "../edit-todo-dialog/edit-todo-dialog.component";
import {AuthService} from "../shared/services/auth.service";
import {SnackService} from "../shared/services/snack.service";

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
})
export class TodosPageComponent implements OnInit {
  todos!: Todo[]
  form!: FormGroup
  min!: Date

  constructor(private todosService: TodosService,
              private dialog: MatDialog,
              private authService: AuthService,
              private snackService: SnackService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(
        null,
        [Validators.required, Validators.maxLength(50)])
    })
    this.todosService.fetch().subscribe(todos => (this.todos = todos).reverse())
  }

  editTodo(todo: Todo) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = todo
    dialogConfig.position = {
      top: '100px'
    }
    dialogConfig.panelClass = 'edit-todo-container-custom'
    const dialogRef = this.dialog.open(EditTodoDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      data => {
        const newTodo = Object.assign(todo, data)
        this.updateTodo(newTodo)
      }
    )
  }

  switchCompleted(todo: Todo) {
    todo.status = !todo.status
    this.updateTodo(todo)
  }

  updateTodo(todo: Todo) {
    this.todosService.update(todo).subscribe()
    const idx = this.todos.findIndex(item => item === todo)
    this.todos[idx] = todo
  }

  deleteTodo(todo: Todo) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = todo.title
    dialogConfig.position = {
      top: '100px'
    }
    dialogConfig.panelClass = 'delete-dialog-container-custom'
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.todosService.delete(todo).subscribe(
            message => this.snackService.openSnackBar(message.message, 'Ok')
          )
          const idx = this.todos.findIndex(item => item === todo)
          this.todos.splice(idx, 1)
        }
      }
    )
  }

  onSubmit() {
    const newTodo: Todo = {
      title: this.form.value.title,
      status: false
    }
    this.todosService.create(newTodo).subscribe(
      todo => {
        this.todos.unshift(todo)
        this.form.reset()
      }
    )
  }

  logout() {
    this.authService.logout()
  }
}
