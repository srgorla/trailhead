public with sharing class AthenaService {
    // ======== CONFIG ========
    public static final String NAMED_CREDENTIAL = 'Aws_athena_ps'; // <-- your NC
    public static final String WORKGROUP = 'primary';
    public static final String ATHENA_DB = 'sf_test_db';
    public static final String ATHENA_TABLE = 'sample_sales';

    public static final String CASE_EXTERNAL_ID_FIELD = 'External_Id__c';
    public static final String ATHENA_CASE_COL = 'case_ext_id';
    // ========================

    private static final String ATHENA_ENDPOINT = 'callout:' + NAMED_CREDENTIAL;

    public class QueryRowDTO {
        @AuraEnabled public Integer id;
        @AuraEnabled public String name;
        @AuraEnabled public Decimal amount;
        @AuraEnabled public String createdDate; // yyyy-mm-dd
    }

    public class StartQueryDTO {
        @AuraEnabled public String queryExecutionId;
        @AuraEnabled public String caseExternalId;
        @AuraEnabled public String sql;
    }

    public class QueryStatusDTO {
        @AuraEnabled public String state; // QUEUED | RUNNING | SUCCEEDED | FAILED | CANCELLED
        @AuraEnabled public String reason;
    }

    public class QueryResultDTO {
        @AuraEnabled public String queryExecutionId;
        @AuraEnabled public QueryStatusDTO status;
        @AuraEnabled public List<QueryRowDTO> rows;
    }

    // 1) Start the Athena query and return QueryExecutionId
    @AuraEnabled(cacheable=false)
    public static StartQueryDTO startSalesQueryForCase(Id caseId, Integer maxRows) {
        if (caseId == null) throw new AuraHandledException('caseId is required.');
        if (maxRows == null || maxRows <= 0) maxRows = 200;

        String caseExternalId = getCaseExternalId(caseId);
        if (String.isBlank(caseExternalId)) {
            StartQueryDTO empty = new StartQueryDTO();
            empty.caseExternalId = null;
            empty.queryExecutionId = null;
            empty.sql = null;
            return empty;
        }

        String safeCaseExt = caseExternalId.replace('\'', '\'\'').trim();
        String sql =
            'SELECT id, name, amount, created_date ' +
            'FROM ' + ATHENA_DB + '.' + ATHENA_TABLE + ' ' +
            'WHERE ' + ATHENA_CASE_COL + ' = \'' + safeCaseExt + '\' ' +
            'ORDER BY id ASC ' +
            'LIMIT ' + maxRows;

        String qid = startQuery(sql);

        StartQueryDTO out = new StartQueryDTO();
        out.queryExecutionId = qid;
        out.caseExternalId = caseExternalId;
        out.sql = sql;
        return out;
    }

    // 2) Check status and return rows if SUCCEEDED
    @AuraEnabled(cacheable=false)
    public static QueryResultDTO getQueryResultsIfReady(String queryExecutionId, Integer maxRows) {
        if (String.isBlank(queryExecutionId)) throw new AuraHandledException('queryExecutionId is required.');
        if (maxRows == null || maxRows <= 0) maxRows = 200;

        QueryStatusDTO st = getQueryStatusDTO(queryExecutionId);

        QueryResultDTO out = new QueryResultDTO();
        out.queryExecutionId = queryExecutionId;
        out.status = st;

        if (st.state == 'SUCCEEDED') {
            List<List<String>> raw = getResults(queryExecutionId, maxRows + 1);
            out.rows = parseSampleSales(raw);
        } else {
            out.rows = new List<QueryRowDTO>();
        }

        return out;
    }

    // -----------------------------
    // Case external id
    // -----------------------------
    private static String getCaseExternalId(Id caseId) {
        String soql = 'SELECT ' + CASE_EXTERNAL_ID_FIELD + ' FROM Case WHERE Id = :caseId';
        SObject c = Database.query(soql);
        return (String)c.get(CASE_EXTERNAL_ID_FIELD);
    }

    // -----------------------------
    // Athena API calls
    // -----------------------------
    private static String startQuery(String sql) {
        Map<String, Object> payload = new Map<String, Object>{
            'QueryString' => sql,
            'ClientRequestToken' => EncodingUtil.convertToHex(Crypto.generateDigest('SHA-256', Blob.valueOf(String.valueOf(DateTime.now().getTime()) + ':' + UserInfo.getUserId()))),
            'QueryExecutionContext' => new Map<String, Object>{
                'Database' => ATHENA_DB
            },
            'ResultConfiguration' => new Map<String, Object>{
                'OutputLocation' => 's3://sf-athena-sg/athena-results/'
            },
            'WorkGroup' => WORKGROUP
        };

        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setEndpoint('callout:' + NAMED_CREDENTIAL + '/');
        req.setHeader('Content-Type', 'application/x-amz-json-1.1');
        req.setHeader('X-Amz-Target', 'AmazonAthena.StartQueryExecution');
        req.setBody(JSON.serialize(payload));

        HttpResponse res = new Http().send(req);

        if (res.getStatusCode() >= 300) {
            throw new AuraHandledException('StartQueryExecution failed: ' + res.getStatusCode() + ' ' + res.getBody());
        }

        Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        return (String)m.get('QueryExecutionId');
    }



    private static QueryStatusDTO getQueryStatusDTO(String qid) {
        Map<String, Object> payload = new Map<String, Object>{ 'QueryExecutionId' => qid };

        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setEndpoint(ATHENA_ENDPOINT + '/');
        req.setHeader('Content-Type', 'application/x-amz-json-1.1');
        req.setHeader('X-Amz-Target', 'AmazonAthena.GetQueryExecution');
        req.setBody(JSON.serialize(payload));

        HttpResponse res = new Http().send(req);
        if (res.getStatusCode() >= 300) {
            throw new AuraHandledException('GetQueryExecution failed: ' + res.getStatusCode() + ' ' + res.getBody());
        }

        Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        Map<String, Object> qe = (Map<String, Object>)m.get('QueryExecution');
        Map<String, Object> status = (Map<String, Object>)qe.get('Status');

        QueryStatusDTO out = new QueryStatusDTO();
        out.state = (String)status.get('State');
        out.reason = (String)status.get('StateChangeReason');
        return out;
    }

    private static List<List<String>> getResults(String qid, Integer maxRows) {
        Map<String, Object> payload = new Map<String, Object>{
            'QueryExecutionId' => qid,
            'MaxResults' => maxRows
        };

        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setEndpoint(ATHENA_ENDPOINT + '/');
        req.setHeader('Content-Type', 'application/x-amz-json-1.1');
        req.setHeader('X-Amz-Target', 'AmazonAthena.GetQueryResults');
        req.setBody(JSON.serialize(payload));

        HttpResponse res = new Http().send(req);
        if (res.getStatusCode() >= 300) {
            throw new AuraHandledException('GetQueryResults failed: ' + res.getStatusCode() + ' ' + res.getBody());
        }

        Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        Map<String, Object> rs = (Map<String, Object>)m.get('ResultSet');
        List<Object> rows = (List<Object>)rs.get('Rows');

        List<List<String>> out = new List<List<String>>();
        for (Object rObj : rows) {
            Map<String, Object> r = (Map<String, Object>)rObj;
            List<Object> data = (List<Object>)r.get('Data');
            List<String> line = new List<String>();
            for (Object dObj : data) {
                Map<String, Object> d = (Map<String, Object>)dObj;
                line.add((String)d.get('VarCharValue'));
            }
            out.add(line);
        }
        return out;
    }

    // -----------------------------
    // Parse
    // -----------------------------
    private static List<QueryRowDTO> parseSampleSales(List<List<String>> raw) {
        List<QueryRowDTO> rows = new List<QueryRowDTO>();
        if (raw == null || raw.size() <= 1) return rows;

        // Header row is index 0
        for (Integer i = 1; i < raw.size(); i++) {
            List<String> r = raw[i];
            if (r == null || r.isEmpty()) continue;

            QueryRowDTO dto = new QueryRowDTO();
            dto.id = tryInt(getCell(r, 0));
            dto.name = getCell(r, 1);
            dto.amount = tryDecimal(getCell(r, 2));
            dto.createdDate = getCell(r, 3);
            rows.add(dto);
        }
        return rows;
    }

    private static String getCell(List<String> row, Integer idx) {
        return (row != null && row.size() > idx) ? row[idx] : null;
    }

    private static Integer tryInt(String s) {
        try { return String.isBlank(s) ? null : Integer.valueOf(s.trim()); }
        catch (Exception e) { return null; }
    }

    private static Decimal tryDecimal(String s) {
        try {
            if (String.isBlank(s)) return null;
            String cleaned = s.replace(',', '').trim();
            return Decimal.valueOf(cleaned);
        } catch (Exception e) {
            return null;
        }
    }
}
