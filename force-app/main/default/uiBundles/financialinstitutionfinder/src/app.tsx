import { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { createDataSDK } from '@salesforce/platform-sdk';
import { Building2, ExternalLink, Search, X } from 'lucide-react';
import './styles.css';

type FieldValue<T> = {
  value: T | null;
};

type AccountNode = {
  Id: string;
  Name: FieldValue<string>;
  Public_Display_Name__c: FieldValue<string>;
  Public_Search_Keywords__c: FieldValue<string>;
  Website: FieldValue<string>;
  BillingCity: FieldValue<string>;
  Logo_URL__c: FieldValue<string>;
  Enrollment_URL__c: FieldValue<string>;
  Supports_Enrollment__c: FieldValue<boolean>;
};

type Institution = {
  id: string;
  name: string;
  keywords: string;
  website: string;
  city: string;
  logoUrl: string;
  enrollmentUrl: string;
  supportsEnrollment: boolean;
};

type GraphQLResponse = {
  uiapi: {
    query: {
      Account: {
        edges: Array<{
          node: AccountNode;
        }>;
      };
    };
  };
};

const FINANCIAL_INSTITUTIONS_QUERY = `
query FinancialInstitutions {
  uiapi {
    query {
      Account(
        first: 200
        where: {
          and: [
            { Publicly_Listed__c: { eq: true } }
            { Institution_Status__c: { eq: "Active" } }
          ]
        }
        orderBy: { Name: { order: ASC } }
      ) {
        edges {
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
      }
    }
  }
}
`;

const alphabet = ['All', '#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

function mapInstitution(node: AccountNode): Institution {
  const name = node.Public_Display_Name__c.value || node.Name.value || 'Unnamed institution';

  return {
    id: node.Id,
    name,
    keywords: node.Public_Search_Keywords__c.value || '',
    website: node.Website.value || '',
    city: node.BillingCity.value || '',
    logoUrl: node.Logo_URL__c.value || '',
    enrollmentUrl: node.Enrollment_URL__c.value || node.Website.value || '',
    supportsEnrollment: node.Supports_Enrollment__c.value === true
  };
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('');
}

function getLetter(name: string): string {
  const first = name.trim()[0]?.toUpperCase();
  return first && /[A-Z]/.test(first) ? first : '#';
}

function groupInstitutions(institutions: Institution[]) {
  return institutions.reduce<Record<string, Institution[]>>((groups, institution) => {
    const letter = getLetter(institution.name);
    groups[letter] = groups[letter] || [];
    groups[letter].push(institution);
    return groups;
  }, {});
}

function filterInstitutions(
  institutions: Institution[],
  searchText: string,
  selectedLetter: string
): Institution[] {
  const normalizedSearch = searchText.trim().toLowerCase();

  return institutions.filter(institution => {
    const letterMatches = selectedLetter === 'All' || getLetter(institution.name) === selectedLetter;
    const searchMatches =
      normalizedSearch.length === 0 ||
      [institution.name, institution.keywords, institution.city]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);

    return letterMatches && searchMatches;
  });
}

function InstitutionLogo({ institution }: { institution: Institution }) {
  const [hasError, setHasError] = useState(false);

  if (!institution.logoUrl || hasError) {
    return <div className="logo-fallback">{getInitials(institution.name) || <Building2 size={20} />}</div>;
  }

  return (
    <img
      className="institution-logo"
      src={institution.logoUrl}
      alt=""
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

function InstitutionRow({ institution }: { institution: Institution }) {
  const actionUrl = institution.enrollmentUrl || institution.website;

  return (
    <article className="institution-row">
      <InstitutionLogo institution={institution} />
      <div className="institution-copy">
        <h3>{institution.name}</h3>
        <p>{institution.city || 'Online banking'}</p>
      </div>
      <div className="institution-actions">
        <span className={institution.supportsEnrollment ? 'status-pill ready' : 'status-pill'}>
          {institution.supportsEnrollment ? 'Enrollment' : 'Info'}
        </span>
        {actionUrl && (
          <a className="open-link" href={actionUrl} target="_blank" rel="noreferrer" aria-label={`Open ${institution.name}`}>
            <ExternalLink size={18} />
          </a>
        )}
      </div>
    </article>
  );
}

function InstitutionList({ institutions }: { institutions: Institution[] }) {
  const groups = groupInstitutions(institutions);
  const letters = Object.keys(groups).sort();

  return (
    <div className="results-list">
      {letters.map(letter => (
        <section className="letter-section" key={letter} aria-labelledby={`letter-${letter}`}>
          <h2 id={`letter-${letter}`}>{letter}</h2>
          <div className="letter-results">
            {groups[letter].map(institution => (
              <InstitutionRow key={institution.id} institution={institution} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function DirectoryPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadInstitutions() {
      setIsLoading(true);
      setError('');

      try {
        const data = await createDataSDK();
        const result = await data.graphql?.query<GraphQLResponse, Record<string, never>>({
          query: FINANCIAL_INSTITUTIONS_QUERY,
          variables: {}
        });

        if (result?.errors?.length) {
          throw new Error(result.errors.map(item => item.message).join('; '));
        }

        const rows = result?.data?.uiapi.query.Account.edges.map(edge => mapInstitution(edge.node)) || [];

        if (isMounted) {
          setInstitutions(rows);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load institutions.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInstitutions();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredInstitutions = useMemo(
    () => filterInstitutions(institutions, searchText, selectedLetter),
    [institutions, searchText, selectedLetter]
  );

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Public directory</p>
        <h1>Find your financial institution</h1>
        <p className="intro">Search active public financial institution records from Salesforce.</p>
      </header>

      <section className="search-panel" aria-label="Institution search">
        <label className="search-box">
          <Search size={20} aria-hidden="true" />
          <input
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
            placeholder="Search by institution name or city"
            aria-label="Search by institution name or city"
          />
          {searchText && (
            <button className="clear-button" type="button" onClick={() => setSearchText('')} aria-label="Clear search">
              <X size={18} />
            </button>
          )}
        </label>

        <div className="alphabet-filter" aria-label="Filter by first letter">
          {alphabet.map(letter => (
            <button
              key={letter}
              type="button"
              className={selectedLetter === letter ? 'active' : ''}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>

      <section className="results-summary" aria-live="polite">
        <strong>{filteredInstitutions.length}</strong>
        <span>{filteredInstitutions.length === 1 ? ' institution' : ' institutions'}</span>
      </section>

      {isLoading && <div className="state-panel">Loading institutions...</div>}

      {!isLoading && error && (
        <div className="state-panel error">
          <strong>Could not load institutions.</strong>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && filteredInstitutions.length === 0 && (
        <div className="state-panel">No matching institutions found.</div>
      )}

      {!isLoading && !error && filteredInstitutions.length > 0 && <InstitutionList institutions={filteredInstitutions} />}
    </main>
  );
}

function NotFound() {
  return (
    <main className="app-shell">
      <h1>Page not found</h1>
    </main>
  );
}

const rawBasePath = (globalThis as { SFDC_ENV?: { basePath?: string } }).SFDC_ENV?.basePath;
const basename = typeof rawBasePath === 'string' ? rawBasePath.replace(/\/+$/, '') : undefined;

const router = createBrowserRouter(
  [
    { path: '/', element: <DirectoryPage /> },
    { path: '*', element: <NotFound /> }
  ],
  { basename }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
