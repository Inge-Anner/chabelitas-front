import { Component, OnInit } from '@angular/core';
import { SeasonsServices } from './mtto-temporadas.service';
import { seasonsModel } from '../models/seasons.model'

@Component({
  selector: 'app-mtto-temporadas',
  templateUrl: './mtto-temporadas.component.html',
  styleUrls: ['./mtto-temporadas.component.scss']
})
export class MttoTemporadasComponent implements OnInit {

  constructor(private seasonsServices: SeasonsServices) { }

  seasons: seasonsModel[] = [];
  newSeason: seasonsModel = {
    statusId: 0,
    seasonName: "",
  }
  mostrar: boolean = false;

  ngOnInit(): void {
    this.ObtenerSeasons();
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
