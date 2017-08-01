import { FormControl } from '@angular/forms';
 
export class IsnumberValidator {
 
    static isValid(control: FormControl): any {
 

        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }

 
        return null;
    }
 
}
