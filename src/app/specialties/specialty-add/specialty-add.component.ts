import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Specialty} from '../specialty';
import * as moment from "moment";
import {SpecialtyService} from "../specialty.service";

@Component({
  selector: 'app-specialty-add',
  templateUrl: './specialty-add.component.html',
  styleUrls: ['./specialty-add.component.css']
})
export class SpecialtyAddComponent implements OnInit {
  specialty: Specialty;
  added_success: boolean = false;
  errorMessage: string;
  @Output() onNew = new EventEmitter<Specialty>();

  constructor(private specialtyService : SpecialtyService) {
    this.specialty = <Specialty>{};
  }

  ngOnInit() {
  }

  onSubmit(specialty: Specialty) {
    specialty.id = null;
    this.specialtyService.addSpecialty(specialty).subscribe(
      new_specialty => {
        this.specialty = new_specialty;
        this.added_success = true;
        this.onNew.emit(this.specialty) ;
      },
      error => this.errorMessage = <any>error
    );
}


}
