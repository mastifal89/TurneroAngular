import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

import './_content/app.less';
declare var $: any;

@Component({ selector: 'app', templateUrl: 'app.component.html', styles: ['./app.component.scss']})
export class AppComponent { 
    currentUser: User;

    ngOnInit(){
        setTimeout(() => {
         $("#calendar").fullCalendar({  
                         header: {
                             left   : 'prev,next today',
                             center : 'title',
                             right  : 'month,agendaWeek,agendaDay'
                         },
                         navLinks   : true,
                         editable   : true,
                         eventLimit : true,
                         events: [
                             {
                                 title : 'This is your',
                                 start : '2019-03-03T12:30:00',
                                 color : '#f9c66a' // override!
                             },
                             {
                                 title : 'Your meeting with john',
                                 start : '2019-03-07T12:30:00',
                                 end   : '2019-03-09',
                                 color : "#019efb"
                             },
                             {
                                 title  : 'This is Today',
                                 start  : '2019-03-12T12:30:00',
                                 allDay : false, // will make the time show,
                                 color  : "#57cd5f"
                             }
                         ],  // request to load current events
                     });
      }, 100);
    }

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}