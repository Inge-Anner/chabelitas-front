import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';
// import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chabelitas-front';
}

export class category extends CategoryComponent {
  override ObtenerCategory(): void {
    
  }
}//