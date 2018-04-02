import { Component, OnInit, Input } from '@angular/core';
import { Personne } from "../personne";
import { ActivatedRoute } from '@angular/router';       //contient info sur l'itinéraire vers l'instance de PersonneDetailComponent
import { Location } from '@angular/common';             //service Angular pour interagir avec le navigateur
import { PersonneService } from "../personne.service";
import $ = require("jquery");

@Component({
    selector: 'app-personne-detail',
    templateUrl: './personne-detail.component.html',
    styleUrls: ['./personne-detail.component.css']
})


export class PersonneDetailComponent implements OnInit {


    @Input() personne : Personne;           // le décorateur Input sert au binding avec PersonnesComponent

    constructor(private route : ActivatedRoute, private pService : PersonneService, private location : Location) {
                                                        //ici, le pService contient les données de la personne du serveur distant

    }

    ngOnInit() {
        this.getPersonne();
        $("#mod").hide();
    }

    getPersonne(): void{                                                // + => convertit un string en nombre
        const id = +this.route.snapshot.paramMap.get("id");             //snapshot => contient les infos du routeur lié au composant
                                                                        //paramMap => dictionnaire de route (lié avec valeur dans l'URL)
        this.pService.getPersonne(id).subscribe(pers => this.personne = pers);
    }

    retour(): void {
        this.location.back();
    }

    sauvegarder(): void {                                           //permet de sauvegarder les changements dans le serveur
        this.pService.sauvegardePersonne(this.personne).subscribe(() => this.retour());
    }

    modifier():void{
        $("#mod").toggle();
    }

}
