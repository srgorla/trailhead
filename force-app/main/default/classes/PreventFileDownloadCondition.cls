/**
 * Transaction Security Policy Condition to prevent internal users from downloading files
 * This class evaluates whether a file download should be blocked based on IP address
 * FOR TESTING: Blocks downloads from IP 98.46.133.200
 */
global class PreventFileDownloadCondition implements TxnSecurity.EventCondition {
    
    /**
     * Evaluates the transaction and determines if it should be blocked
     * @param event SObject representing the file download event
     * @return true if the download should be blocked, false otherwise
     */
    global boolean evaluate(SObject event) {
        // Get event data from the SObject
        String sourceIp = (String)event.get('SourceIp');
        String userId = (String)event.get('UserId');
        system.debug('Event Data' + event);
        
        // TESTING: Block downloads from specific IP address
        if (sourceIp != '98.46.133.200') {
            System.debug('BLOCKED: File download attempt from IP: ' + sourceIp + ' by User: ' + userId);
            return true; // Block the download
        }
        
        System.debug('ALLOWED: File download from IP: ' + sourceIp + ' by User: ' + userId);
        return false; // Allow all other downloads
    }
}