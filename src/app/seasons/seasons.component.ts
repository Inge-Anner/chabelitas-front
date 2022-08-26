import { Component, OnInit } from '@angular/core';
import { SeasonsServices } from './seasons.service'
import { seasonsModel } from '../models/seasons.model'

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})

export class SeasonsComponent implements OnInit {

  constructor(private seasonServices: SeasonsServices) { }

  seasons: seasonsModel[] = [];
  newSeason: seasonsModel = {
    statusId: 0,
    seasonName: "",
  }
  mostrar: boolean = false;
  mostrar3: string = '';
  ngOnInit(): void {
  }

  ObtenerSeasons(): void {
    this.seasonServices.cargarSeason().subscribe((res: any) => {
      this.seasons = res.data;
      this.mostrar = true;
    });
  }

  CrearSeasons(): void {
    this.seasonServices.ingresarSeason(this.newSeason).subscribe((res: any) => {
      this.ObtenerSeasons();
    });
  }


}
