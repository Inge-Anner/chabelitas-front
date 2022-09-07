import { Component, OnInit } from '@angular/core';
import { SeasonsServices } from './mtto-temporadas.service';
import { seasonsModel } from '../models/seasons.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-mtto-temporadas',
  templateUrl: './mtto-temporadas.component.html',
  styleUrls: ['./mtto-temporadas.component.scss']
})
export class MttoTemporadasComponent implements OnInit {

  constructor(public router: Router, private seasonsServices: SeasonsServices) { }

  seasons: seasonsModel[] = [];
  newSeason: seasonsModel = {
    statusId: 0,
    seasonName: "",
  }
  mostrar: boolean = false;

  ngOnInit(): void {
    this.validaSesion();
    this.ObtenerSeasons();
  }

  validaSesion(): void {
    const getSeasons = localStorage.getItem('sesion');
    if (!getSeasons) {
      this.router.navigateByUrl('/login');
    }
  }

  cierraSesion(): void{
    localStorage.removeItem('sesion');
    this.router.navigateByUrl('/login');
  }

  ObtenerSeasons(): void {
    this.seasonsServices.cargarSeason().subscribe((res: any) => {
      this.seasons = res.data;
      this.mostrar = true;
    });
  }

  CrearSeasons(): void {
    this.seasonsServices.ingresarSeason(this.newSeason).subscribe((res: any) => {
      this.ObtenerSeasons();
    });
  }

}
