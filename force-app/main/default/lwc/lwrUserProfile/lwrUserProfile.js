import { LightningElement, wire } from 'lwc';
import USER_ID from '@salesforce/user/Id';
import IS_GUEST from '@salesforce/user/isGuest';
import basePath from '@salesforce/community/basePath';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
import USERNAME_FIELD from '@salesforce/schema/User.Username';
import PROFILE_NAME_FIELD from '@salesforce/schema/User.Profile.Name';

const FIELDS = [
    NAME_FIELD,
    EMAIL_FIELD,
    USERNAME_FIELD,
    PROFILE_NAME_FIELD
];

export default class LwrUserProfile extends LightningElement {
    userId = USER_ID;
    isGuestUser = IS_GUEST;

    @wire(getRecord, { recordId: '$userId', fields: FIELDS })
    userRecord;

    get showCard() {
        return !this.isGuestUser && this.userRecord?.data;
    }

    get displayName() {
        return getFieldValue(this.userRecord.data, NAME_FIELD) || '';
    }

    get email() {
        return getFieldValue(this.userRecord.data, EMAIL_FIELD) || '';
    }

    get username() {
        return getFieldValue(this.userRecord.data, USERNAME_FIELD) || '';
    }

    get profileName() {
        return getFieldValue(this.userRecord.data, PROFILE_NAME_FIELD) || '';
    }

    get initials() {
        const name = this.displayName;
        if (!name) return '?';

        return name
            .split(' ')
            .filter(part => part)
            .slice(0, 2)
            .map(part => part[0].toUpperCase())
            .join('');
    }

    get logoutUrl() {
        const sitePrefix = basePath === '/' ? '' : basePath;
        return `${sitePrefix}/secur/logout.jsp`;
    }
}