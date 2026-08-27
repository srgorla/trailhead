# React FI List Render Sequence

This document explains the sequence used by the Financial Institution Finder React app to render the bank list.

## Short Version

1. Browser loads `index.html`.
2. `index.html` loads `src/app.tsx`.
3. `app.tsx` creates the React router.
4. React renders `DirectoryPage`.
5. `DirectoryPage` first renders a loading state.
6. After the first render, `useEffect` runs `loadInstitutions`.
7. `loadInstitutions` creates the Salesforce Data SDK client.
8. The SDK sends the GraphQL query to Salesforce UI API.
9. Salesforce returns `Account` records.
10. Each `Account` record is converted into an `Institution`.
11. React state is updated with `setInstitutions`.
12. React re-renders `DirectoryPage`.
13. `DirectoryPage` filters the institutions.
14. `InstitutionList` renders the grouped list.
15. `InstitutionName` renders each bank name as a button or plain text.

## File Entry Sequence

### 1. `index.html`

File:

```text
force-app/main/default/uiBundles/financialinstitutionfinder/index.html
```

This is the browser entry file.

Important parts:

```html
<div id="root"></div>
<script type="module" src="/src/app.tsx"></script>
```

The `root` div is where React renders the app. The script tag loads the React code from `src/app.tsx`.

### 2. `src/app.tsx`

File:

```text
force-app/main/default/uiBundles/financialinstitutionfinder/src/app.tsx
```

This file contains almost the whole React app.

The imports run first:

```ts
import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { createDataSDK } from "@salesforce/platform-sdk";
```

These imports bring in React, the browser renderer, routing, and the Salesforce Data SDK.

## React Startup Sequence

Near the bottom of `app.tsx`, the app creates the router:

```ts
const router = createBrowserRouter(
  [
    { path: '/', element: <DirectoryPage /> },
    { path: '*', element: <NotFound /> }
  ],
  { basename }
);
```

For the home page `/`, React should render `DirectoryPage`.

Then React attaches the app to the browser DOM:

```ts
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

Call sequence:

```text
index.html
  -> src/app.tsx
    -> createBrowserRouter(...)
    -> createRoot(...)
    -> RouterProvider
    -> DirectoryPage
```

## First Render

The first real page component is:

```ts
function DirectoryPage() {
```

It initializes React state:

```ts
const [institutions, setInstitutions] = useState<Institution[]>([]);
const [searchText, setSearchText] = useState("");
const [selectedLetter, setSelectedLetter] = useState("All");
const [selectedInstitution, setSelectedInstitution] =
  useState<Institution | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState("");
```

On the first render:

- `institutions` is empty.
- `isLoading` is `true`.
- `error` is empty.

Because `isLoading` is `true`, this part renders:

```tsx
{
  isLoading && <div className="state-panel">Loading institutions...</div>;
}
```

At this point, the bank data has not been loaded yet.

## Data Load Sequence

After the first render, this `useEffect` runs:

```ts
useEffect(() => {
  let isMounted = true;

  async function loadInstitutions() {
    ...
  }

  void loadInstitutions();

  return () => {
    isMounted = false;
  };
}, []);
```

The empty dependency array `[]` means this effect is intended to run once when `DirectoryPage` mounts.

In local development, React `StrictMode` may run effects twice to help detect side effects. That can make network calls appear twice in the browser console.

## Salesforce SDK Call

Inside `loadInstitutions`, the app creates a Salesforce Data SDK client:

```ts
const data = await createDataSDK();
```

Then it starts loading pages of Account records:

```ts
let after: string | null = null;
let hasNextPage = true;

while (hasNextPage) {
  const result = await data.graphql?.query({
    query: FINANCIAL_INSTITUTIONS_QUERY,
    variables: { after }
  });
  ...
}
```

The query is stored earlier in the same file:

```ts
const FINANCIAL_INSTITUTIONS_QUERY = `
query FinancialInstitutions($after: String) {
  uiapi {
    query {
      Account(
        first: 200
        after: $after
        where: {
          and: [
            { Publicly_Listed__c: { eq: true } }
            { Institution_Status__c: { eq: "Active" } }
          ]
        }
        orderBy: { Name: { order: ASC } }
      ) {
        edges {
          cursor
          node {
            Id
            Name { value }
            Public_Display_Name__c { value }
            Public_Search_Keywords__c { value }
            Website { value }
            BillingCity { value }
            Logo_URL__c { value }
            Enrollment_URL__c { value }
            Supports_Enrollment__c { value }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
}
`;
```

This asks Salesforce for public, active `Account` records, 200 records at a time.

## Mapping Salesforce Data

Salesforce returns Account nodes. Each Account node is converted to the app's simpler `Institution` shape:

```ts
rows.push(
  ...(accountConnection?.edges.map((edge) => mapInstitution(edge.node)) || [])
);
```

That calls:

```ts
function mapInstitution(node: AccountNode): Institution {
```

The mapping logic chooses the public display name first, then falls back to the Account name:

```ts
const name =
  node.Public_Display_Name__c.value || node.Name.value || "Unnamed institution";
```

Then it returns the fields the UI needs:

```ts
return {
  id: node.Id,
  name,
  keywords: node.Public_Search_Keywords__c.value || "",
  website: node.Website.value || "",
  city: node.BillingCity.value || "",
  logoUrl: node.Logo_URL__c.value || "",
  enrollmentUrl: node.Enrollment_URL__c.value || node.Website.value || "",
  supportsEnrollment: node.Supports_Enrollment__c.value === true
};
```

## State Update and Re-render

After a page of data is loaded, React state is updated:

```ts
setInstitutions([...rows]);
```

This is the key trigger for the second render.

React state update sequence:

```text
GraphQL returns Account records
  -> mapInstitution(...)
  -> setInstitutions([...rows])
  -> React schedules re-render
  -> DirectoryPage runs again
```

Once the first page is loaded, the loading state is turned off:

```ts
setIsLoading(false);
```

## Filtering Before Render

On each render, `DirectoryPage` calculates filtered lists:

```ts
const searchFilteredInstitutions = useMemo(
  () => filterBySearch(institutions, searchText),
  [institutions, searchText]
);
```

This creates the list used to know which alphabet letters should be enabled.

Then it builds the set of available letters:

```ts
const availableLetters = useMemo(
  () =>
    new Set(
      searchFilteredInstitutions.map((institution) =>
        getLetter(institution.name)
      )
    ),
  [searchFilteredInstitutions]
);
```

Then it calculates the final visible list:

```ts
const filteredInstitutions = useMemo(
  () => filterInstitutions(institutions, searchText, selectedLetter),
  [institutions, searchText, selectedLetter]
);
```

Call sequence:

```text
DirectoryPage render
  -> filterBySearch(...)
  -> getLetter(...)
  -> filterInstitutions(...)
```

## List Rendering Sequence

If loading is finished, there is no error, and records exist, this renders:

```tsx
<InstitutionList
  institutions={filteredInstitutions}
  onSelectInstitution={setSelectedInstitution}
/>
```

Inside `InstitutionList`:

```ts
function InstitutionList({ institutions, onSelectInstitution }) {
  const groups = groupInstitutions(institutions);
  const letters = zelleAlphabet.filter(letter => groups[letter]?.length);
  ...
}
```

It groups records by first letter:

```ts
const groups = groupInstitutions(institutions);
```

That calls:

```ts
function groupInstitutions(institutions: Institution[]) {
```

Each group renders as a letter section:

```tsx
{
  letters.map((letter) => (
    <section className="letter-section" key={letter}>
      <h2>{letter}</h2>
      <div className="letter-results">
        {groups[letter].map((institution) => (
          <InstitutionName
            key={institution.id}
            institution={institution}
            onSelect={onSelectInstitution}
          />
        ))}
      </div>
    </section>
  ));
}
```

Then each bank name is rendered by:

```ts
function InstitutionName({ institution, onSelect }) {
```

If the institution has an enrollment URL or website, it renders a clickable button:

```tsx
<button
  className="institution-name institution-trigger"
  type="button"
  onClick={() => onSelect(institution)}
>
  {institution.name}
</button>
```

If it has no URL, it renders plain text:

```tsx
<span className="institution-name">{institution.name}</span>
```

Final render sequence:

```text
DirectoryPage
  -> InstitutionList
    -> groupInstitutions
    -> letters.map(...)
      -> groups[letter].map(...)
        -> InstitutionName
```

## Click Sequence

When a user clicks a bank name, `InstitutionName` calls:

```ts
onClick={() => onSelect(institution)}
```

In `DirectoryPage`, `onSelectInstitution` is passed as:

```tsx
onSelectInstitution = { setSelectedInstitution };
```

So the click updates this state:

```ts
const [selectedInstitution, setSelectedInstitution] =
  useState<Institution | null>(null);
```

After that state update, `DirectoryPage` re-renders and this condition becomes true:

```tsx
{
  selectedInstitution && (
    <BankRedirectModal
      institution={selectedInstitution}
      onCancel={() => setSelectedInstitution(null)}
    />
  );
}
```

Then the modal renders:

```text
InstitutionName click
  -> setSelectedInstitution(institution)
  -> DirectoryPage re-renders
  -> BankRedirectModal renders
```

## Full Call Stack Style Summary

```text
Browser
  -> index.html
    -> /src/app.tsx
      -> createBrowserRouter
      -> createRoot(...).render(...)
        -> RouterProvider
          -> DirectoryPage
            -> initial state setup
            -> first render: loading UI
            -> useEffect
              -> loadInstitutions
                -> createDataSDK
                -> data.graphql.query(FINANCIAL_INSTITUTIONS_QUERY)
                  -> Salesforce UI API GraphQL
                    -> Account records
                -> mapInstitution for each Account
                -> setInstitutions
                -> setIsLoading(false)
            -> re-render
              -> filterBySearch
              -> getLetter
              -> filterInstitutions
              -> InstitutionList
                -> groupInstitutions
                -> InstitutionName for each institution
```

## Important React Idea

React components do not run only once.

`DirectoryPage` runs:

1. Once with empty data, showing the loading message.
2. Again after `setInstitutions` receives Salesforce data.
3. Again whenever search text, selected letter, or selected bank changes.

The main pattern is:

```text
state changes -> React re-renders -> UI updates
```
