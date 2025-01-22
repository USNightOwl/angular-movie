import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MoviesScrollerComponent } from '../../components/movies-scroller/movies-scroller.component';
import { imagesBaseUrl, MoviesService } from '../../services/movies.service';
import { map, Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { Actor } from '../../models/credit';
import { Video } from '../../models/video';
import { ActivatedRoute } from '@angular/router';
import { VideoComponent } from '../../components/video/video.component';

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CurrencyPipe, MoviesScrollerComponent, VideoComponent],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.css'
})
export class ShowMovieComponent {
  @Input() movieId: string = '';
  private moviesService = inject(MoviesService);
  public movieObs$! : Observable<Movie>;
  public movieCastObs$!: Observable<Actor[]>; 
  public movieVideosObs$! : Observable<Video[]>;
  public similarMoviesObs$!: Observable<Movie[]>;
  public imagesBaseUrl = imagesBaseUrl;
  private activatedRouter = inject(ActivatedRoute);
  public showVideo = false;

  ngOnInit() {
    this.activatedRouter.params.pipe(map((p) => p['movieId'])).subscribe((id)=> {
      this.movieObs$ = this.moviesService.fetchMovieById(id); 
      this.movieCastObs$ = this.moviesService.fetchMovieCast(id);
      this.movieVideosObs$ = this.moviesService.fetchMovieVideos(id);
      this.similarMoviesObs$ = this.moviesService.fetchSimilarMovies(id);
    })
  }

  openVideo(){
    this.showVideo = true;
  }
  closeVideo(){
    this.showVideo = false;
  }
}
