import { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { createDataSDK } from '@salesforce/platform-sdk';
import { Search, X } from 'lucide-react';
import zelleLogo from './assets/zelle-logo.svg';
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

const zelleAlphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), '#'];

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

function InstitutionName({ institution }: { institution: Institution }) {
  const actionUrl = institution.enrollmentUrl || institution.website;

  if (!actionUrl) {
    return <span className="institution-name">{institution.name}</span>;
  }

  return (
    <a className="institution-name" href={actionUrl} target="_blank" rel="noreferrer">
      {institution.name}
    </a>
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
              <InstitutionName key={institution.id} institution={institution} />
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
      <header className="brand-header">
        <div className="brand-inner">
          <div className="zelle-lockup" aria-label="Zelle Find Your Bank">
            <img
              className="zelle-wordmark"
              src={zelleLogo}
              alt="Zelle"
            />
            <span className="lockup-divider" aria-hidden="true" />
            <span className="lockup-title">Find Your Bank</span>
          </div>
        </div>
      </header>

      <section className="search-hero" aria-label="Institution search">
        <div className="search-inner">
          <label className="search-box">
            <Search size={42} strokeWidth={1.5} aria-hidden="true" />
            <input
              value={searchText}
              onChange={event => {
                setSearchText(event.target.value);
                setSelectedLetter('All');
              }}
              placeholder="Search"
              aria-label="Search by institution name or city"
            />
            {searchText && (
              <button className="clear-button" type="button" onClick={() => setSearchText('')} aria-label="Clear search">
                <X size={22} />
              </button>
            )}
          </label>
        </div>
      </section>

      <nav className="alphabet-band" aria-label="Filter by first letter">
        <div className="alphabet-filter">
          {zelleAlphabet.map(letter => (
            <button
              key={letter}
              type="button"
              className={selectedLetter === letter ? 'active' : ''}
              onClick={() => setSelectedLetter(selectedLetter === letter ? 'All' : letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </nav>

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
