import { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { createDataSDK } from '@salesforce/platform-sdk';
import { Facebook, Instagram, Search, Twitter, X, Youtube } from 'lucide-react';
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

type AccountEdge = {
  cursor: string;
  node: AccountNode;
};

type AccountConnection = {
  edges: AccountEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
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
      Account: AccountConnection;
    };
  };
};

type GraphQLError = {
  message: string;
};

type FinancialInstitutionsResult = {
  data?: GraphQLResponse;
  errors?: GraphQLError[];
};

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

function filterBySearch(institutions: Institution[], searchText: string): Institution[] {
  const normalizedSearch = searchText.trim().toLowerCase();

  if (normalizedSearch.length === 0) {
    return institutions;
  }

  return institutions.filter(institution =>
    [institution.name, institution.keywords, institution.city]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch)
  );
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
  const letters = zelleAlphabet.filter(letter => groups[letter]?.length);

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

function ZelleInfoFooter() {
  return (
    <footer className="zelle-info">
      <section className="zelle-info-panel" aria-labelledby="zelle-info-heading">
        <h2 id="zelle-info-heading">What is Zelle<sup>®</sup>?</h2>
        <p>
          Zelle<sup>®</sup> is a fast, safe and easy way to send and receive money directly between almost any bank
          accounts in the U.S., typically within minutes.<sup>1</sup> With just an email address or U.S. mobile phone
          number, you can send money to and receive money from friends, family and others you trust.
        </p>
        <a className="learn-more" href="https://www.zellepay.com/how-it-works" target="_blank" rel="noreferrer">
          Learn More
        </a>
      </section>

      <section className="zelle-footer-nav" aria-label="Zelle footer links">
        <div className="footer-lockup">
          <img src={zelleLogo} alt="Zelle" />
          <nav>
            <a href="https://www.zellepay.com/contact-us" target="_blank" rel="noreferrer">
              Contact Us
            </a>
            <a href="https://www.zellepay.com/financial-institutions" target="_blank" rel="noreferrer">
              Partners
            </a>
            <a href="https://www.zellepay.com/press-releases" target="_blank" rel="noreferrer">
              Press
            </a>
            <a href="https://www.zellepay.com/legal" target="_blank" rel="noreferrer">
              Legal
            </a>
            <a href="https://www.zellepay.com/privacy" target="_blank" rel="noreferrer">
              Your Privacy Rights
            </a>
          </nav>
          <nav className="social-links" aria-label="Zelle social media">
            <a href="https://twitter.com/Zelle" target="_blank" rel="noreferrer" aria-label="Zelle on Twitter">
              <Twitter size={22} strokeWidth={2.4} aria-hidden="true" />
            </a>
            <a href="https://www.facebook.com/Zelle" target="_blank" rel="noreferrer" aria-label="Zelle on Facebook">
              <Facebook size={22} strokeWidth={2.4} aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/zellepay/" target="_blank" rel="noreferrer" aria-label="Zelle on Instagram">
              <Instagram size={22} strokeWidth={2.4} aria-hidden="true" />
            </a>
            <a href="https://www.youtube.com/user/ZellePay" target="_blank" rel="noreferrer" aria-label="Zelle on YouTube">
              <Youtube size={24} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div className="footer-rule" />
        <p className="footnote">
          <sup>1</sup> Must have a bank account in the U.S. to use Zelle<sup>®</sup>. Transactions typically occur in
          minutes when the recipient&apos;s email address or U.S. mobile number is already enrolled with Zelle
          <sup>®</sup>.
        </p>
        <p className="copyright">
          ©2026 Early Warning Services, LLC. All rights reserved. Zelle, the Zelle related marks, and the color purple
          are registered trademarks or trademarks of Early Warning Services, LLC.
        </p>
      </section>
    </footer>
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
        const rows: Institution[] = [];
        let after: string | null = null;
        let hasNextPage = true;

        while (hasNextPage) {
          const result: FinancialInstitutionsResult | undefined = await data.graphql?.query<
            GraphQLResponse,
            { after: string | null }
          >({
            query: FINANCIAL_INSTITUTIONS_QUERY,
            variables: { after }
          });

          if (result?.errors?.length) {
            throw new Error(result.errors.map(item => item.message).join('; '));
          }

          const accountConnection: AccountConnection | undefined = result?.data?.uiapi.query.Account;
          rows.push(...(accountConnection?.edges.map(edge => mapInstitution(edge.node)) || []));
          hasNextPage = accountConnection?.pageInfo.hasNextPage === true;
          after = accountConnection?.pageInfo.endCursor || null;
        }

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

  const searchFilteredInstitutions = useMemo(() => filterBySearch(institutions, searchText), [institutions, searchText]);
  const availableLetters = useMemo(() => new Set(searchFilteredInstitutions.map(institution => getLetter(institution.name))), [
    searchFilteredInstitutions
  ]);
  const filteredInstitutions = useMemo(
    () => filterInstitutions(institutions, searchText, selectedLetter),
    [institutions, searchText, selectedLetter]
  );

  useEffect(() => {
    if (selectedLetter !== 'All' && !availableLetters.has(selectedLetter)) {
      setSelectedLetter('All');
    }
  }, [availableLetters, selectedLetter]);

  return (
    <main className="app-shell">
      <header className="brand-header">
        <div className="brand-inner">
          <div className="zelle-lockup" aria-label="Zelle Find Your Bank">
            <a className="zelle-home-link" href="https://www.zellepay.com/" target="_blank" rel="noreferrer">
              <img className="zelle-wordmark" src={zelleLogo} alt="Zelle" />
            </a>
            <span className="lockup-divider" aria-hidden="true" />
            <span className="lockup-title">Find Your Bank</span>
          </div>
        </div>
      </header>

      <section className="search-hero" aria-label="Institution search">
        <div className="search-inner">
          <label className="search-box">
            <Search className="search-icon" size={42} strokeWidth={1.5} aria-hidden="true" />
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
          {zelleAlphabet.map(letter => {
            const hasMatches = availableLetters.has(letter);

            return (
              <button
                key={letter}
                type="button"
                className={selectedLetter === letter ? 'active' : ''}
                disabled={!hasMatches}
                onClick={() => setSelectedLetter(selectedLetter === letter ? 'All' : letter)}
              >
                {letter}
              </button>
            );
          })}
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

      <ZelleInfoFooter />
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
