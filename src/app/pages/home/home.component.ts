import { Component, inject } from '@angular/core';
import { imagesBaseUrl, MoviesService } from '../../services/movies.service';
import { map } from 'rxjs';
import { SliderComponent } from '../../components/slider/slider.component';
import { MoviesScrollerComponent } from '../../components/movies-scroller/movies-scroller.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, MoviesScrollerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private moviesService = inject(MoviesService);
  public imagesBaseUrl = imagesBaseUrl;
  public popularMovies$ = this.moviesService
    .fetchMoviesByType('popular')
    .pipe(map((data) => data.results));
  public topRatedMovies$ = this.moviesService
    .fetchMoviesByType('top_rated')
    .pipe(map((data) => data.results));
  public nowPlayingMovies$ = this.moviesService
    .fetchMoviesByType('now_playing')
    .pipe(map((data) => data.results));
}
