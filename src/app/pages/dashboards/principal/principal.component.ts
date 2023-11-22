import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  iframeLSrc: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
   ) {
    if (window.location.hostname === '10.0.112.200') {
      this.iframeLSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`http://10.0.112.200:2000/public/dashboard/850898cf-6e64-4fa2-94e3-1bf2239e3c24`);
    } else {
      this.iframeLSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:3000/public/dashboard/6df67ee0-81bf-41c8-a48b-860c2b8cfe65`);
    }
    }
      ngOnInit(): void {  }

    }
