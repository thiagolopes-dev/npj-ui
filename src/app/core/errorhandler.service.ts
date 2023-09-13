import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable()

export class ErrorHandleService {

    constructor(
        private messageService: MessageService,
        private router: Router
    ) { }

    handle() { }
}