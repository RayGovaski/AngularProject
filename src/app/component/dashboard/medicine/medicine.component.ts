import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medicine } from 'src/app/shared/model/medicine';
import { DataService } from 'src/app/shared/service/data.service';
import { DeletePatientComponent } from './delete-medicine/delete-patient.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent {

  allMedicines : Medicine[] = [];
  displayedColumns: string[] = ['medicine_id', 'name', 'genericName', 'sideEffects','prescriptionRequired'];
  dataSource!: MatTableDataSource<Medicine>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllMedicines();
  }

  addMedicine() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Register Medicine',
      buttonName : 'Register'
    }

    const dialogRef = this.dialog.open(AddMedicineComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addMedicine(data);
        this.openSnackBar("Registration of medicine is successful.", "OK")
      }
    })
  }

  getAllMedicines() {
    this.dataApi.getAllMedicines().subscribe(res => {
      this.allMedicines = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.patient_id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.allMedicines);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewMedicine(row : any) {
    window.open('/dashboard/medicine/'+row.medicine_id,'_blank');
  }

  editMedicine(row : any) {
    if(row.medicine_id == null || row.medicine_name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit medicine";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.admission_date = row.admission_date.toDate();

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddMedicineComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateMedicine(data);
        this.openSnackBar("Medicine is updated successfully.", "OK")
      }
    })
  }

  deleteMedicine(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete medicine',
      medicineName : row.medicine_name
    }

    const dialogRef = this.dialog.open(DeletePatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log(row);
        this.dataApi.deleteMedicine(row.medicine_id);
        this.openSnackBar("Medicine deleted successfully.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
