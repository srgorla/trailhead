import { LightningElement, track } from 'lwc';
import fetchAccount from '@salesforce/apex/AccountApiController.fetchAccount';

export default class AccountFetcher extends LightningElement {
    @track accountId = '';
    @track apiVersion = 'v65.0';
    @track result = null;
    @track error = '';
    @track isLoading = false;

    get prettyBody() {
        try {
            if (this.result?.body) {
                const obj = JSON.parse(this.result.body);
                return JSON.stringify(obj, null, 2);
            }
        } catch (e) {
            // if not JSON, just return raw
        }
        return this.result?.body || '';
    }

    handleIdChange(event) {
        this.accountId = event.target.value?.trim();
    }

    handleVersionChange(event) {
        this.apiVersion = event.target.value?.trim();
    }

    async handleFetch() {
        this.error = '';
        this.result = null;

        if (!this.accountId) {
            this.error = 'Please enter an Account Id.';
            return;
        }

        this.isLoading = true;
        try {
            const res = await fetchAccount({ accountId: this.accountId, apiVersion: this.apiVersion });
            this.result = res;
            if (res && res.statusCode >= 400) {
                // surface API error details if present
                this.error = res.errorMessage || 'API returned a non-success status.';
            }
        } catch (e) {
            this.error = e?.body?.message || e?.message || 'Unexpected error invoking Apex.';
        } finally {
            this.isLoading = false;
        }
    }
}
