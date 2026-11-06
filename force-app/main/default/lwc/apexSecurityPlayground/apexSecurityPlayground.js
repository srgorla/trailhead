import { LightningElement } from "lwc";
import queryWithSharingOnly from "@salesforce/apex/ApexSecurityPlayground.queryWithSharingOnly";
import queryUserMode from "@salesforce/apex/ApexSecurityPlayground.queryUserMode";
import querySecurityEnforced from "@salesforce/apex/ApexSecurityPlayground.querySecurityEnforced";
import querySystemModeWithSharing from "@salesforce/apex/ApexSecurityPlayground.querySystemModeWithSharing";
import queryWithoutSharing from "@salesforce/apex/ApexSecurityPlaygroundWithoutSharing.queryWithoutSharing";
import queryUserModeDespiteWithoutSharing from "@salesforce/apex/ApexSecurityPlaygroundWithoutSharing.queryUserModeDespiteWithoutSharing";

const COLUMNS = [
  { label: "Account Name", fieldName: "Name" },
  { label: "Industry", fieldName: "Industry" },
  { label: "Record Id", fieldName: "Id", type: "text" }
];

const EXAMPLES = [
  {
    key: "sharing",
    label: "with sharing only",
    description: "Record sharing applies; CRUD/FLS are not checked.",
    run: queryWithSharingOnly
  },
  {
    key: "userMode",
    label: "WITH USER_MODE",
    description: "Enforces sharing, CRUD, FLS, and user data access rules.",
    run: queryUserMode
  },
  {
    key: "securityEnforced",
    label: "WITH SECURITY_ENFORCED (legacy)",
    description: "Legacy CRUD/FLS check; record sharing follows the class.",
    run: querySecurityEnforced
  },
  {
    key: "systemWithSharing",
    label: "WITH SYSTEM_MODE + with sharing",
    description: "Skips CRUD/FLS; record sharing still applies.",
    run: querySystemModeWithSharing
  },
  {
    key: "withoutSharing",
    label: "without sharing + SYSTEM_MODE",
    description: "System-mode query bypasses record sharing and CRUD/FLS.",
    run: queryWithoutSharing
  },
  {
    key: "userModeOverrides",
    label: "without sharing + WITH USER_MODE",
    description:
      "User mode enforces the running user access despite without sharing.",
    run: queryUserModeDespiteWithoutSharing
  }
];

export default class ApexSecurityPlayground extends LightningElement {
  columns = COLUMNS;
  examples = EXAMPLES.map((example) => ({
    ...example,
    rows: [],
    error: "",
    loading: false,
    hasRun: false
  }));

  handleRun(event) {
    this.runByKey(event.currentTarget.dataset.key);
  }

  runByKey(key) {
    const selected = this.examples.find((example) => example.key === key);
    if (!selected || selected.loading) return;

    this.examples = this.examples.map((example) => {
      return example.key === key
        ? { ...example, loading: true, error: "", hasRun: false, rows: [] }
        : example;
    });

    selected
      .run()
      .then((rows) => {
        this.updateExample(key, { rows, loading: false, hasRun: true });
      })
      .catch((error) => {
        this.updateExample(key, {
          error: error?.body?.message || error?.message || "The query failed.",
          loading: false,
          hasRun: true
        });
      });
  }

  handleRunAll() {
    this.examples.forEach((example) => this.runByKey(example.key));
  }

  updateExample(key, changes) {
    this.examples = this.examples.map((example) => {
      return example.key === key ? { ...example, ...changes } : example;
    });
  }
}
