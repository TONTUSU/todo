import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  form!: FormGroup
  todoTitle!: string

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: string) {
    this.todoTitle = data
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({})
  }

  save() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close()
  }

}
