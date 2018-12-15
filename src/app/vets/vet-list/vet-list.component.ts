import {Component, OnInit} from '@angular/core';
import {Vet} from '../vet';
import {VetService} from '../vet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vet-list',
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css']
})
export class VetListComponent implements OnInit {
  vets: Vet[];
  errorMessage: string;
  response_status: number;

  constructor(private vetService: VetService, private router: Router) {
    this.vets = [];
  }

  ngOnInit() {
    this.vetService.getVets().subscribe(
      vets => this.vets = vets,
      error => this.errorMessage = <any> error);
  }

  deleteVet(vet: Vet) {
    this.vetService.deleteVet(vet.id.toString()).subscribe(
      response => {
        this.response_status = response;
        this.vets = this.vets.filter(current_item => !(current_item.id === vet.id));
      },
      error => this.errorMessage = <any> error);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

  addVet() {
    this.router.navigate(['/vets/add']);
  }

  editVet(vet: Vet) {
    this.router.navigate(['/vets', vet.id, 'edit']);
  }
}
