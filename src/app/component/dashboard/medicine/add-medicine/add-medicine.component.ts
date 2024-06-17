import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  medicine_name !: string;
  genericName !: string;
  prescriptionRequired !: string;
  expiryDate !: Date;
  sideEffects !: string;
  medicine_id !: string;
  buttonName !: string;

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddMedicineComponent>,
  ) {

      this.title = data.title;
      this.medicine_id = data.medicine_id;
      this.medicine_name = data.medicine_name;
      this.genericName = data.genericName;
      this.prescriptionRequired = data.prescriptionRequired;
      this.expiryDate = data.expiryDate;
      this.sideEffects = data.sideEffects;
      this.buttonName = data.buttonName;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      medicine_id: [this.medicine_id, []],
      medicine_name : [this.medicine_name, [Validators.required]],
      genericName : [this.genericName, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      prescriptionRequired : [this.prescriptionRequired, [Validators.required]],
      expiryDate : [this.expiryDate, [Validators.required]],
      sideEffects : [this.sideEffects, [Validators.required]]
    })

  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerMedicine() {
    this.dialogRef.close(this.form.value);
  }

}
