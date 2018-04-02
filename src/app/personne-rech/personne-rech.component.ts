import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { Personne } from "../personne";
import { PersonneService } from "../personne.service";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-personne-rech',
    templateUrl: './personne-rech.component.html',
    styleUrls: ['./personne-rech.component.css']
})
export class PersonneRechComponent implements OnInit {

    personnes$ : Observable<Personne[]>;
    private termRecherche = new Subject<string>();      //Subject --> à la fois une source de valeurs et un observable

    constructor(private pService : PersonneService) { }

    recherche(term : string): void{         //ici, le termRecherche devient un flux constant de termes de recherche
        this.termRecherche.next(term);      //pousse le terme recherché dans un flux Observable avec la methode next
    }

    ngOnInit(): void {
        this.personnes$ = this.termRecherche.pipe(     //pour éviter une quantité excessive de requêtes HTTP
            debounceTime(300),                  //attend 300ms après chaque frappe avant de proposer les termes
            distinctUntilChanged(),                    //ignore le terme si il n'a pas changé
            switchMap((mot : string) => this.pService.barreRecherche(mot))
                                                    //passe à une nouvelle recherche observable si le terme change
        );
    }

}
