// forceGoogleLogin.js
import { LightningElement } from 'lwc';

export default class ForceGoogleLogin extends LightningElement {
    
    connectedCallback() {
        const startUrl = new URL(window.location.href).searchParams.get('startURL') || '/mylwr/';
        const encodedStartUrl = encodeURIComponent(startUrl);
        
        window.location.replace('/mylwrvforcesite/services/auth/sso/Google');
        /*
        window.location.replace(`/mylwr/services/auth/sso/Google?startURL=${encodedStartUrl}`);
 
        window.location.replace(
            `/mylwrvforcesite/services/auth/sso/Google?startURL=${encodedStartUrl}`
        );
        */
    }

    
}