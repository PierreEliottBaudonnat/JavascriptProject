import { Component, OnInit } from '@angular/core';
import { Personne } from "../personne";
import { PersonneService } from "../personne.service";

@Component({
    selector: 'app-favoris',
    templateUrl: './favoris.component.html',
    styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {

    personnes : Personne[] = [];

    constructor(private pService : PersonneService) { }

    ngOnInit() {
        this.getPersonnes();
    }

    getPersonnes(): void {
        this.pService.getPersonnes().subscribe(pers => this.personnes = pers.slice(0,4));
    }

}
