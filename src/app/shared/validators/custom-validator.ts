import { FormGroup } from '@angular/forms';

export class CustomValidators{

public static passwordsMatch(password: string, confirmedPassword: string) {
       
 return (control: FormGroup) : { [s: string]: boolean } =>{
    const pass = control.get(password).value;
    const confirmpass = control.get(confirmedPassword).value;
   console.log(pass,confirmpass);
    if (pass !== confirmpass) {
      return { 'passwordMismatch': true }
    } else {
      return null;
    }
}
  }

//   public static passwordConfirming(c: AbstractControl): { invalid: boolean } {
//     if (c.get('password').value !== c.get('confirm_password').value) {
//         return {invalid: true};
//     }else{
//         return {invalid:false};
//     }
// } 
}
