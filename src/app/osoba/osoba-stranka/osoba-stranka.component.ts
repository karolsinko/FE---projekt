import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Osoba} from '../../models/osoba.model';
import {OsobaServiceService} from "../../../osoba-service.service";


@Component({
  templateUrl: './osoba-stranka.component.html',
  styleUrls: ['./osoba-stranka.component.css'],
  selector: 'app-osoba-stranka'
})
export class OsobaStrankaComponent {

  osoby: Osoba[] = [];

  osobaNaUpravu?: Osoba;

  constructor(private router: Router, private osobaService: OsobaServiceService) { }

  ngOnInit(): void {
    this.obnovitOsoby();
  }

  obnovitOsoby(): void {
    this.osobaService.getOsoby().subscribe(data => {
      console.log('prislo:', data);
      this.osoby = [];
      for (const d of data) {
        this.osoby.push({ id: d.id, meno: d.meno, priezvisko: d.priezvisko, rok_nar: d.rok_nar, rod_cislo: d.rod_cislo, tel_cislo: d.tel_cislo, bydlisko: d.bydlisko, pohlavie: d.pohlavie});
      }
    });
  }

  chodSpat(): void {
    this.router.navigate(['']);
  }

  pridaj(osoba: Osoba): void {
    this.osoby.push(osoba);
  }

  uprav(osoba: Osoba): void {
    const index = this.osoby.findIndex(osobaArray => osobaArray.id === osoba.id);
    if (index !== -1) {
      this.osoby[index] = osoba;
    }
  }

  upravZoZoznamu(osoba: Osoba): void {
    this.osobaNaUpravu = osoba;
  }

  zmazZoZoznamu(osoba: Osoba): void {
    const index = this.osoby.findIndex(osobaArray => osobaArray.id === osoba.id);
    if (index !== -1) {
      this.osoby.splice(index, 1);
    }
  }
}
