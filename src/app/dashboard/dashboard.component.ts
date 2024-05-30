import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  students: Observable<any[]> | undefined;
  newStudent: any = {};
  editMode: boolean[] = [];
  isEditMode: boolean = false;
  editIndex: number | null = null;

  constructor(private DB: DatabaseService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.students = this.DB.getStudents();
  }

  addOrUpdate(): void {
    if (this.newStudent.name && this.newStudent.studentNo && this.newStudent.address) {
      if (this.isEditMode && this.editIndex !== null) {
        this.DB.updateStudent(this.newStudent.key, this.newStudent);
        this.editMode[this.editIndex] = false;
        this.isEditMode = false;
      } else {
        this.DB.addStudent(this.newStudent);
      }
      this.newStudent = {};
    }
  }

  edit(student: any, index: number): void {
    this.newStudent = { ...student };
    this.isEditMode = true;
    this.editIndex = index;
  }

  cancelEdit(): void {
    this.newStudent = {};
    this.isEditMode = false;
    this.editIndex = null;
  }

  delete(key: string): void {
    this.DB.deleteStudent(key);
  }

  logout(): void {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

