import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../shared/interfaces";
import {TodosService} from "../shared/services/todos.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {EditTodoDialogComponent} from "../edit-todo-dialog/edit-todo-dialog.component";
import {AuthService} from "../shared/services/auth.service";
import {SnackService} from "../shared/services/snack.service";
import {Router} from "@angular/router";
import {ReplaySubject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
})
export class TodosPageComponent implements OnInit, OnDestroy {
  todos!: Todo[]
  form!: FormGroup
  min!: Date
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1)

  constructor(private todosService: TodosService,
              private dialog: MatDialog,
              private authService: AuthService,
              private snackService: SnackService,
              private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(
        null,
        [Validators.required, Validators.maxLength(50)])
    })
    this.todosService.fetch().pipe(takeUntil(this.destroy)).subscribe(todos => (this.todos = todos).reverse())
  }

  ngOnDestroy() {
    this.destroy.next(null)
    this.destroy.complete()
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
    dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe(
      data => {
        if (data) {
          const newTodo = Object.assign(todo, data)
          this.updateTodo(newTodo)
        }
      }
    )
  }

  switchCompleted(todo: Todo) {
    todo.status = !todo.status
    this.updateTodo(todo)
  }

  updateTodo(todo: Todo) {
    this.todosService.update(todo).pipe(takeUntil(this.destroy)).subscribe()
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

    dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe(
      data => {
        if (data) {
          this.todosService.delete(todo).pipe(takeUntil(this.destroy)).subscribe(
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

    this.todosService.create(newTodo).pipe(takeUntil(this.destroy)).subscribe(
      todo => {
        this.todos.unshift(todo)
        this.form.reset()
      }
    )
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
