import { Component, OnInit} from '@angular/core';
import { setTheme } from "ngx-bootstrap/utils";
import { AuthService } from "./services/auth.service";
import { RolesService } from "./services/roles.service";
import { ParentsService } from "./services/parents.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { SocketService } from "./services/socket.service";
import { NotificationsService } from "angular2-notifications";

enum Action {
  JOINED,
  LEFT,
  RENAME
}

enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  parentToggle = "";
  teacherToggle = "";
  userType: "";
  userName: "";
  breadcrumbs: any;
  sons = [];

  action = Action;
  user: any;
  messages: any[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(
    public authSvc: AuthService,
    public rolesSvc: RolesService,
    public parentsSvc: ParentsService,
    private location: Location,
    private router: ActivatedRoute,
    private socketService: SocketService,
    private _notificationSvc: NotificationsService
  ) {
    setTheme("bs4");
    this.userType = this.rolesSvc.getUserType();
    this.userName = this.rolesSvc.getUserName();

    setTimeout(() => {
      if (rolesSvc.isParent()) {
        parentsSvc.getSons().subscribe(
          sons =>
            (this.sons = sons.map(son => {
              return {
                id: son.id,
                routeLink: "parent/son/" + son.id,
                student: son.student
              };
            }))
        );
      }
    }, 500);
  }

  ngOnInit(): void {
    this.initIoConnection();
  }

  reloadUrl(sonUrl) {
    location.href = "" + sonUrl;
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: any) => {
        console.log(message);
        this.messages.push(message);
      });
    //chat message
    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log("connected");
    });

    this.socketService.onEvent("message").subscribe(() => {
      console.log("chat message");
      var temp = { animate: "fromRight", clickToClose: true, pauseOnHover: true, showProgressBar: true, timeOut: 5000 };

      this._notificationSvc.create("Title", "Hello This is a message", "success", temp);

    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("disconnected");
    });
  }

  sendMessageVoid() {
    console.log("This ii");
    var temp = { animate: "fromRight", clickToClose: true, pauseOnHover: true, showProgressBar: true, timeOut: 5000};

    this._notificationSvc.create("Title", "Hello This is a notification", "success", temp);

    this.sendMessage("This is a message");
  }

  public sendMessage(message: string) {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.rolesSvc.getUserName(),
      content: message
    });
    this.messageContent = null;
  }
}
