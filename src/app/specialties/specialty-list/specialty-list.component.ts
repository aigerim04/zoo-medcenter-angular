import {Component, OnInit} from '@angular/core';
import {Specialty} from '../specialty';
import {SpecialtyService} from '../specialty.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent implements OnInit {
  specialties: Specialty[];
  errorMessage: string;
  response_status: number;
  is_insert: boolean = false;

  constructor(private specService: SpecialtyService, private router: Router) {
    this.specialties = [];
  }

  ngOnInit() {
    this.specService.getSpecialties().subscribe(
      specialties => this.specialties = specialties,
      error => this.errorMessage = <any> error);
  }

  deleteSpecialty(specialty: Specialty) {
    this.specService.deleteSpecialty(specialty.id.toString()).subscribe(
      response => {
        this.response_status = response;
        this.specialties = this.specialties.filter(current_item => !(current_item.id === specialty.id));
      },
      error => this.errorMessage = <any> error);
  }

  onNewSpecialty(new_specialty: Specialty){
    this.specialties.push(new_specialty);
    this.showAddSpecialtyComponent();
  }

  showAddSpecialtyComponent() {
    this.is_insert = !this.is_insert;
  }

  showEditSpecialtyComponent(updated_specialty: Specialty) {
    this.router.navigate(['/specialties', updated_specialty.id.toString(), 'edit']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

}
