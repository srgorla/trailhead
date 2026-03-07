import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';

// Define fields outside the class so they're available to the wire decorator
const USER_FIELDS = [
    'User.FirstName',
    'User.LastName',
    'User.Username',
    'User.Email',
    'User.Title',
    'User.Department',
    'User.Phone',
    'User.MobilePhone',
    'User.CompanyName'
];

export default class WelcomeUser extends LightningElement {
    userId = Id;
    
    // Configuration for which fields to display
    fieldConfig = [
        { api: 'FirstName', label: 'First Name', show: false },
        { api: 'LastName', label: 'Last Name', show: false },
        { api: 'Username', label: 'Username', show: true },
        { api: 'Email', label: 'Email', show: true },
        { api: 'Title', label: 'Title', show: true },
        { api: 'Department', label: 'Department', show: true },
        { api: 'Phone', label: 'Phone', show: true },
        { api: 'MobilePhone', label: 'Mobile', show: true },
        { api: 'CompanyName', label: 'Company', show: true }
    ];

    @wire(getRecord, { 
        recordId: '$userId', 
        fields: USER_FIELDS
    })
    userDetails;

    get displayFields() {
        if (!this.userDetails.data) return [];
        
        return this.fieldConfig
            .filter(field => field.show)
            .map(field => ({
                label: field.label,
                value: this.userDetails.data.fields[field.api]?.value
            }))
            .filter(field => field.value); // Only show fields with values
    }

    get welcomeMessage() {
        if (this.userDetails.data) {
            const firstName = this.userDetails.data.fields.FirstName?.value;
            const lastName = this.userDetails.data.fields.LastName?.value;
            return `Welcome, ${firstName} ${lastName}!`;
        }
        return 'Welcome!';
    }

    get hasUserData() {
        return !!this.userDetails.data;
    }
}