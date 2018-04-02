import { Component, OnInit } from '@angular/core';
import { Personne } from "../personne";             //on importe la classe Personne
import { PersonneService } from "../personne.service";

@Component({
    selector: 'app-personnes',
    templateUrl: './personnes.component.html',
    styleUrls: ['./personnes.component.css']
})
export class PersonnesComponent implements OnInit {

    personnes : Personne[];

    //personneSel : Personne;

    constructor(private pService : PersonneService) {        // instance de PersonneService

    }

    ngOnInit() {
        this.getPersonnes();
    }

    /*
    estSelectionne(personne : Personne) : void{
        this.personneSel = personne;
    }
    */

    getPersonnes(): void {
        this.pService.getPersonnes().subscribe(pers => this.personnes = pers);      //Attend l'Observable PersonneService (prend + ou - de temps)
                                                                                        //Le subscribe passe le tableau reçu à l'Observable

    }

    ajout(nom : string, prenom : string, adresse : string, codePostal : number, ville : string, email : string): void{
        nom=nom.trim();
        prenom=prenom.trim();
        adresse=adresse.trim();                                                 //permet d'ajouter une nouvelle personne au serveur
        ville=ville.trim();
        email=email.trim();

        if (!nom || !prenom || !adresse || !codePostal || !ville || !email){return;}

        if (typeof codePostal !== "number") {
            alert("Alerte code postal");
        }

        else {
            this.pService.ajoutPersonne({nom, prenom, adresse, codePostal, ville, email} as Personne).subscribe(pers => {
                this.personnes.push(pers)
            });
        }
    }

    supprimer(pers : Personne) : void{
        this.personnes = this.personnes.filter(p => p !== pers);        //permet de supprimer de la liste personnes
        this.pService.suppressionPersonne(pers).subscribe();
    }



}

/*

personne : Personne = {
      id : 1,
      nom : "Baudonnat",
      prenom : "Pierre-Eliott",
      adresse : "12 rue Dany Boon",
      codePostal : 63000,
      ville : "Clermont-Ferrand",
      email : "pierreliott.baudonnat@laposte.net",
  };

 */
