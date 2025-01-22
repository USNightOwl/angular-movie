import { Component, Input } from '@angular/core';
import { imagesBaseUrl } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  public imagesBaseUrl = imagesBaseUrl;
  @Input() movie!: Movie;
}
