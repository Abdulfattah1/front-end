import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthService } from "../Auth/Auth.service";
import { User } from "../shared/user.model";
@Injectable()
export class homeService {
  constructor(private http: Http, private authService: AuthService) {}
}
