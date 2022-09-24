import { Component, OnInit } from '@angular/core';
import { SeasonsServices } from './mtto-temporadas.service';
import { seasonsModel } from '../models/seasons.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mtto-temporadas',
  templateUrl: './mtto-temporadas.component.html'
})
export class MttoTemporadasComponent implements OnInit {

  constructor(public router: Router, private seasonsServices: SeasonsServices) { }

  seasons: seasonsModel[] = [];
  newSeason: seasonsModel = {
    statusId: 0,
    seasonName: "",
  }
  searchSeason: number = 0;
  mostrar: boolean = false;
  Clean: string = "";
  checked: string = "";

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

  cierraSesion(): void {
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

  ObtenerSeasonById(): void {
    this.seasonsServices.buscarSeasonById(this.searchSeason).subscribe((res: any) => {
      this.newSeason = res.data
    });
  }

  UpdateSeasonById(): void {
    this.seasonsServices.actualizarSeason(this.searchSeason, this.newSeason).subscribe((res: any) => {
      this.ObtenerSeasons();
    });
  }

  activarSeason(id: number | undefined): void {
    let season: any = {
      statusId: 1
    }
    this.seasonsServices.actualizarSeason(id, season).subscribe((res: any) => {
      this.ObtenerSeasons();
    });
  }

  inactivarSeason(id: number | undefined): void {
    let season: any = {
      statusId: 2
    }
    this.seasonsServices.actualizarSeason(id, season).subscribe((res: any) => {
      this.ObtenerSeasons();
    });
  }

  DeleteSeasonById(): void {
    this.seasonsServices.eliminarSeason(this.searchSeason).subscribe((res: any) => {
      this.ObtenerSeasons();
    });
  }

  LimpiarBusqueda() {
    window.location.reload()
  }
}