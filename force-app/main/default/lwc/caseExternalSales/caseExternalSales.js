import { LightningElement, api, wire } from 'lwc';
import getSalesForCase from '@salesforce/apex/ExternalSalesOnCaseController.getSalesForCase';

export default class CaseExternalSales extends LightningElement {
    @api recordId;

    rows;
    error;
    empty = false;

    columns = [
        { label: 'ID', fieldName: 'Id__c', type: 'number' },
        { label: 'Name', fieldName: 'Name__c', type: 'text' },
        { label: 'Amount', fieldName: 'Amount__c', type: 'number' },
        { label: 'Created Date', fieldName: 'Created_date__c', type: 'text' }
    ];

    @wire(getSalesForCase, { caseId: '$recordId' })
    wiredSales({ data, error }) {
        if (data) {
            this.rows = data;
            this.error = undefined;
            this.empty = data.length === 0;
        } else if (error) {
            this.rows = undefined;
            this.empty = false;
            this.error = this.reduceError(error);
        }
    }

    reduceError(err) {
        try {
            if (Array.isArray(err.body)) return err.body.map(e => e.message).join(', ');
            return err.body?.message || err.message || 'Unknown error';
        } catch (e) {
            return 'Unknown error';
        }
    }
}
