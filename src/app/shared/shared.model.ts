import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./dropdown.directive";

@NgModule({
    declarations:[
        DropdownDirective
    ],
    exports:[
        CommonModule,
        DropdownDirective
    ],
    imports:[
    ]
})
export class sharedModel {}