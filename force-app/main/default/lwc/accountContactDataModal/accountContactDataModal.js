import { LightningElement, api, wire } from 'lwc';
import getAccountData from '@salesforce/apex/ApexInt.getAccountData';
import ContactModal from 'c/contactModal';

export default class AccountContactDataModal extends LightningElement {
    @api recordId;
    accountData = [];
    error;

    columns = [
        { label: 'Account ID', fieldName: 'accId' },
        { label: 'Account Name', fieldName: 'name', type: 'string', wrapText: true },
        {
            label: 'Contact Count',
            fieldName: 'conCount',
            type: 'button',
            typeAttributes: {
                label: { fieldName: 'conCount' },
                name: 'showContacts',
                variant: 'base'
            }
        }
    ];

    get accountList() {
        return this.recordId ? [this.recordId] : null;
    }

    @wire(getAccountData, { accIds: '$accountList' })
    wiredContacts({ error, data }) {
        if (data) {
            this.accountData = data;
            this.error = undefined;
        } else if (error) {
            this.accountData = [];
            this.error = error;
        }
    }

    async handleRowAction(event) {
        const row = event.detail.row;

        const catalogObject = {
            type: "ContactCountClick for " + row.name,
            id: "evt-" + Math.random().toString(36).substring(2),
            category: "Engagement",
            dateTime: new Date().toISOString(),
            deviceId: "dev-" + Math.random().toString(36).substring(2),
            eventId: "evt-" + Math.random().toString(36).substring(2),
            eventType: "ContactCountClick",
            interactionName: "Clicked Contact Count",
            sessionId: "sess-" + Math.random().toString(36).substring(2),
            pageView: 1,
            sourceUrl: window.location.href,
            sourceUrlReferrer: document.referrer,
            sourceChannel: "Web",
            sourceLocale: navigator.language,
            sourcePageType: "Landing Page"
        };
        console.log("catalogObject as JSON:", JSON.stringify(catalogObject, null, 2));

        // ✅ Try to send engagement event
        if (typeof window.SalesforceInteractions !== 'undefined') {
            console.log("✅ SalesforceInteractions SDK is available");

            try {
                window.SalesforceInteractions.sendEvent({
                    interaction: {
                        name: "FromHomePage",
                        catalogObject: catalogObject
                    }
                });
            } catch (e) {
                console.error("❌ Engagement event failed:", e.message, e.stack);
            }
        } else {
            console.warn("⚠️ SalesforceInteractions SDK is not loaded or not available in this context.");
        }
        sessionStorage.setItem('clickedAccount', row.name);
        document.cookie = `clickedAccountCookie=${encodeURIComponent(row.name)}; path=/; SameSite=Lax;`;
        

        console.log('clickedAccount set in sessionStorage:', sessionStorage.getItem('clickedAccount'));
        // ✅ Show contact modal
        console.log("Opening modal for contacts:", row.name);
        await ContactModal.open({
            size: 'medium',
            description: `Contacts for ${row.name}`,
            label: `Via Modal Contacts for ${row.name}`,
            title: `Via Modal Contacts for ${row.name}`,
            contacts: row.conList
        });

    }
}