import { LightningElement, track } from 'lwc';
import getOrderDetails from '@salesforce/apex/OrderDetailsController.getOrderDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OrderDetailsViewer extends LightningElement {
    @track orderId = '';
    @track orderData = null;
    @track error = null;
    @track isLoading = false;

    // Columns for items datatable
    columns = [
        { label: 'Item ID', fieldName: 'item_id', type: 'text' },
        { label: 'Product Name', fieldName: 'product_name', type: 'text' },
        { label: 'Quantity', fieldName: 'quantity', type: 'number' },
        { 
            label: 'Unit Price', 
            fieldName: 'unit_price', 
            type: 'currency',
            typeAttributes: { currencyCode: 'USD', step: '0.01' }
        },
        { 
            label: 'Total', 
            fieldName: 'total', 
            type: 'currency',
            typeAttributes: { currencyCode: 'USD', step: '0.01' }
        }
    ];

    get hasOrderData() {
        return this.orderData !== null;
    }

    get orderItems() {
        return this.orderData?.items || [];
    }

    get statusVariant() {
        const status = this.orderData?.status?.toLowerCase();
        if (status === 'shipped') return 'success';
        if (status === 'processing') return 'warning';
        if (status === 'pending') return 'inverse';
        return 'base';
    }

    handleOrderIdChange(event) {
        this.orderId = event.target.value;
        this.error = null;
    }

    handleSearch() {
        if (!this.orderId) {
            this.showToast('Error', 'Please enter an Order ID', 'error');
            return;
        }

        this.isLoading = true;
        this.error = null;
        this.orderData = null;

        getOrderDetails({ orderId: this.orderId })
            .then(result => {
                if (result && result.success) {
                    this.orderData = result.order;
                } else {
                    this.error = result.message || 'Order not found';
                    this.showToast('Error', this.error, 'error');
                }
            })
            .catch(error => {
                this.error = error.body?.message || error.message || 'An error occurred';
                this.showToast('Error', this.error, 'error');
                console.error('Error fetching order:', error);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    handleClear() {
        this.orderId = '';
        this.orderData = null;
        this.error = null;
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}