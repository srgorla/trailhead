import { LightningElement, api } from 'lwc';
import startSalesQueryForCase from '@salesforce/apex/AthenaService.startSalesQueryForCase';
import getQueryResultsIfReady from '@salesforce/apex/AthenaService.getQueryResultsIfReady';

export default class AthenaSalesViewer extends LightningElement {
    @api recordId;

    rows = [];
    error;
    status = 'Idle';
    caseExternalId;
    queryExecutionId;
    polling = false;

    columns = [
        { label: 'ID', fieldName: 'id', type: 'number' },
        { label: 'Name', fieldName: 'name', type: 'text' },
        { label: 'Amount', fieldName: 'amount', type: 'number' },
        { label: 'Created Date', fieldName: 'createdDate', type: 'text' }
    ];

    connectedCallback() {
        this.refresh();
    }

    disconnectedCallback() {
        this.polling = false;
    }

    async refresh() {
        this.error = undefined;
        this.rows = [];
        this.status = 'Starting query...';
        this.polling = false;

        try {
            const start = await startSalesQueryForCase({ caseId: this.recordId, maxRows: 200 });
            this.caseExternalId = start?.caseExternalId;

            if (!start?.queryExecutionId) {
                this.status = 'No Case External Id found on this Case.';
                return;
            }

            this.queryExecutionId = start.queryExecutionId;
            this.status = `Query started (${this.queryExecutionId})`;

            this.polling = true;
            await this.pollLoop();
        } catch (e) {
            this.status = 'Error';
            this.error = this.reduceError(e);
        }
    }

    async pollLoop() {
        let attempts = 0;
        const maxAttempts = 25; // ~25 seconds

        while (this.polling && attempts < maxAttempts) {
            attempts++;

            const res = await getQueryResultsIfReady({
                queryExecutionId: this.queryExecutionId,
                maxRows: 200
            });

            const state = res?.status?.state;

            if (state === 'SUCCEEDED') {
                this.rows = res.rows || [];
                this.status = `SUCCEEDED (${this.rows.length} rows)`;
                this.polling = false;
                return;
            }

            if (state === 'FAILED' || state === 'CANCELLED') {
                this.status = `${state}: ${res?.status?.reason || ''}`;
                this.polling = false;
                return;
            }

            this.status = state || 'RUNNING';
            await this.delay(1000);
        }

        if (this.polling) {
            this.status = 'Timed out waiting for Athena results.';
            this.polling = false;
        }
    }

    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    reduceError(err) {
        const b = err?.body;
        if (Array.isArray(b)) return b.map(x => x.message).join(', ');
        return b?.message || err?.message || 'Unknown error';
    }
}
