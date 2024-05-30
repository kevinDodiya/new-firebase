import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public datatable: any = "item"

  constructor(private db: AngularFireDatabase) { }

  getStudents(): Observable<any[]> {
    return this.db.list(this.datatable).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.val() as any;
          const key = c.payload.key;
          return { key, ...data };
        })
      )
    );
  }

  addStudent(student: any): void {
    this.db.list(this.datatable).push(student);
  }

  updateStudent(key: string, updatedStudent: any): void {
    this.db.list(this.datatable).update(key, updatedStudent);
  }

  deleteStudent(key: string): void {
    this.db.list(this.datatable).remove(key);
  }

}
