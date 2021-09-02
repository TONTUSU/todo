import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Todo} from "../shared/interfaces";
import {Moment} from "moment";
import * as moment from "moment";

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {
  form!: FormGroup
  data: Todo
  minDate!: Moment

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditTodoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: Todo) {
    this.data = data
    this.minDate = moment()
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(50)]],
      priority: this.data.priority || 'middle',
      date: this.data.deadLine || moment()
    })
  }

  save() {
    const newTodo: Todo = {
      title: this.form.value.title,
      priority: this.form.value.priority,
      deadLine: this.form.value.date,
      status: this.data.status
    }
    this.dialogRef.close(newTodo)
  }

  close() {
    this.dialogRef.close()
  }

}
