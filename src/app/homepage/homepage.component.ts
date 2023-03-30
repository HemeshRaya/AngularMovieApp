import { Component, OnInit } from '@angular/core';
import { AvatarsService } from '../avatars.service';
import { MovieslistService } from '../movieslist.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(public movielistservice: MovieslistService,
              public avatarService: AvatarsService,
              private modalService: MdbModalService) { }
  url:any;
  next:any;
  previous:any;
  moviesArr:any;
  pageNo:any;
  isError=false;
  //original flow
  // ngOnInit(): void {
  //   this.url='https://demo.credy.in/api/v1/maya/movies/'
  //   this.url='https://api.themoviedb.org/3/trending/all/day?api_key=9693f82dbca7a9241324fc089437c245'
  //   this.movielistservice.getMovies(this.url).subscribe((data)=>{
  //     this.moviesArr = data.results;
  //     this.next = data.next;
  //     this.previous = data.previous;
  //     this.pageNo = 1;
  //     for(var i=0;i<this.moviesArr.length;i++)
  //     {
  //       this.moviesArr[i].avatarUrl = "https://ui-avatars.com/api/?format=svg&rounded=true&name="+this.moviesArr[i].title.replace(/ /g, "+");
  //       this.moviesArr[i].avatarUrlSqr = "https://ui-avatars.com/api/?size=128&name="+this.moviesArr[i].title.replace(/ /g, "+");
  //       if(this.moviesArr[i].genres==='')
  //       this.moviesArr[i].genres = 'NA';
  //     }
  //     console.log(this.moviesArr)
  //   },
  //   (err)=>{
  //     this.isError=true;
  //   })
  // }

  ngOnInit(): void {
    this.url='https://api.themoviedb.org/3/trending/all/day?api_key=9693f82dbca7a9241324fc089437c245'
    this.movielistservice.getMovies(this.url).subscribe((data)=>{
      this.moviesArr = data.results;
      this.next = 'https://api.themoviedb.org/3/trending/all/day?api_key=9693f82dbca7a9241324fc089437c245&&page=2';
      this.previous = null;
      this.pageNo = 1;
      for(var i=0;i<this.moviesArr.length;i++)
      {
        this.moviesArr[i].avatarUrl = "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].poster_path;
        this.moviesArr[i].avatarUrlSqr = "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].poster_path;
        this.moviesArr[i].bgpath= "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].backdrop_path;
        if(this.moviesArr[i].genres==='')
        this.moviesArr[i].genres = 'NA';
      }
      console.log(this.moviesArr)
    },
    (err)=>{
      this.isError=true;
    })
  }

  nextPage(){
    if(this.next!=null){
      this.pageNo+=1;
      this.movielistservice.getMovies(this.next).subscribe((data)=>{
        this.moviesArr = data.results;
        if(data.total_pages==this.pageNo)
        this.next=null;
        else
        this.next = 'https://api.themoviedb.org/3/trending/all/day?api_key=9693f82dbca7a9241324fc089437c245&&page='+(this.pageNo+1);
        if(data.total_pages==0)
        this.previous=null;
        else
        this.previous = 'https://api.themoviedb.org/3/trending/all/day?api_key=9693f82dbca7a9241324fc089437c245&&page='+(this.pageNo-1);
        for(var i=0;i<this.moviesArr.length;i++)
        {
          this.moviesArr[i].avatarUrl = "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].poster_path;
          this.moviesArr[i].avatarUrlSqr = "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].poster_path;
          this.moviesArr[i].bgpath= "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].backdrop_path;
          if(this.moviesArr[i].genres==='')
          this.moviesArr[i].genres = 'NA';
        }
      })
    }
  }

  previousPage(){
    if(this.previous!=null){
      this.pageNo-=1;
      this.movielistservice.getMovies(this.previous).subscribe((data)=>{
        this.moviesArr = data.results;
        if(data.total_pages==this.pageNo)
        this.next=null;
        else
        this.next = 'https://api.themoviedb.org/3/trending/all/day?api_key=9693f82dbca7a9241324fc089437c245&&page='+(this.pageNo+1);
        if(data.total_pages==0)
        this.previous=null;
        else
        this.previous = 'https://api.themoviedb.org/3/trending/all/day?api_key=9693f82dbca7a9241324fc089437c245&&page='+(this.pageNo-1);
        for(var i=0;i<this.moviesArr.length;i++)
        {
          this.moviesArr[i].avatarUrl = "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].poster_path;
          this.moviesArr[i].avatarUrlSqr = "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].poster_path;
          this.moviesArr[i].bgpath= "http://image.tmdb.org/t/p/w500/"+this.moviesArr[i].backdrop_path;
          if(this.moviesArr[i].genres==='')
          this.moviesArr[i].genres = 'NA';
        }
      })
    }
  }

  movieData(data:any){
    this.openModal(data);
  }

  openModal(data:any) {
    console.log(data);
    this.modalRef = this.modalService.open(ModalComponent,{
      data:{'data':data}
    })
  }

  realodPage(){
    window.location.reload();
  }

}
