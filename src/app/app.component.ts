import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  form: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder, private matSnackBar: MatSnackBar) {}

  ngOnInit(){
    this.form = this.formBuilder.group({
      birthYear: [2000, [Validators.required, Validators.min(2000)]],
      bac: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
    
      grade1: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
      rank1: [0, [Validators.required, Validators.min(1)]],
      batch1: [0, [Validators.required, Validators.min(1)]],
    
      grade2: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
      rank2: [0, [Validators.required, Validators.min(1)]],
      batch2: [0, [Validators.required, Validators.min(1)]],
    
      grade3: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
      rank3: [0, [Validators.required, Validators.min(1)]],
      batch3: [0, [Validators.required, Validators.min(1)]]
    });
  }

  calculateB1(birthYear: number){
    if(birthYear >= new Date().getFullYear() - 22) return 5
    return 0
  }

  calculateB2(bac: number){
    switch(true){
      case bac >= 15: return 10
      case bac < 15 && bac >= 14: return 7
      case bac <14 && bac >= 13: return 5
      default: return 0
    }
  }

  calculateM(grade1: number, grade2: number, grade3: number){
    let Mg = (grade1 + 2*grade2 + grade3)/4

    switch(true){
      case Mg >= 15: return 100
      case Mg < 15 && Mg > 10: return 20*(Mg - 10)
      default: return 0  
    }

  }

  private ri(rank: number, batch: number){
    return (rank - 1)/batch
  }

  private calculateRi(ri: number){
    if(ri <= 0.3) return 100 - (700*ri)/3
    return 0
  }

  calculateR(){
    const R1 = this.calculateRi(this.ri(this.form.value.rank1, this.form.value.batch1))
    const R2 = this.calculateRi(this.ri(this.form.value.rank2, this.form.value.batch2))
    const R3 = this.calculateRi(this.ri(this.form.value.rank3, this.form.value.batch3))

    return (R1 + R2 + R3)/3
  }


  submit(){

    const B1 = this.calculateB1(this.form.value.birthYear)
    const B2 = this.calculateB2(this.form.value.bac)
    const M = this.calculateM(this.form.value.grade1, this.form.value.grade2, this.form.value.grade3)
    const R = this.calculateR()


    const total = 0.5*M + 0.5*R + B1 + B2
    this.displayResult(total)
  }

  displayResult(score: number){
    this.matSnackBar.open(`Score: ${(Math.round(score * 100)/100).toFixed(2)}/115`, "Close")
  }




}
