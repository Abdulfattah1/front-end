import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./dropdown.directive";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
    declarations:[
        DropdownDirective,
        SettingsComponent
    ],
    exports:[
        CommonModule,
        DropdownDirective,
        SettingsComponent
    ],
    imports:[
    ]
})
export class sharedModel {}