import { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Link, RouterProvider } from 'react-router';
import { createDataSDK } from '@salesforce/platform-sdk';
import QRCode from 'qrcode';
import { Copy, Download, Facebook, Instagram, Printer, Search, Share2, Twitter, X, Youtube } from 'lucide-react';
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

type MerchantQrForm = {
  name: string;
  action: 'payment' | 'request';
  token: string;
  amount: string;
  currency: string;
  note: string;
};

type MerchantQrPayload = {
  name: string;
  action: string;
  token: string;
  amount?: number;
  currency?: string;
  note?: string;
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
const ZELLE_QR_BASE_URL = 'https://enroll.zellepay.com/qr-codes';

const initialMerchantQrForm: MerchantQrForm = {
  name: '',
  action: 'payment',
  token: '',
  amount: '',
  currency: 'USD',
  note: ''
};

function encodeBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function buildMerchantQrPayload(form: MerchantQrForm): MerchantQrPayload {
  const payload: MerchantQrPayload = {
    name: form.name.trim(),
    action: form.action,
    token: form.token.trim()
  };

  if (form.amount.trim()) {
    const amount = Number(form.amount);

    if (Number.isFinite(amount) && amount > 0) {
      payload.amount = amount;
    }
  }

  if (form.currency.trim()) {
    payload.currency = form.currency.trim().toUpperCase();
  }

  if (form.note.trim()) {
    payload.note = form.note.trim();
  }

  return payload;
}

function buildMerchantQrUrl(form: MerchantQrForm): string {
  const payload = buildMerchantQrPayload(form);
  const encodedPayload = encodeBase64(JSON.stringify(payload));
  const url = new URL(ZELLE_QR_BASE_URL);
  url.searchParams.set('data', encodedPayload);

  return url.toString();
}

function isMerchantQrFormValid(form: MerchantQrForm): boolean {
  const amount = form.amount.trim();

  return (
    form.name.trim().length > 0 &&
    form.action.trim().length > 0 &&
    form.token.trim().length > 0 &&
    (amount.length === 0 || (Number.isFinite(Number(amount)) && Number(amount) > 0))
  );
}

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

function InstitutionName({
  institution,
  onSelect
}: {
  institution: Institution;
  onSelect: (institution: Institution) => void;
}) {
  const actionUrl = institution.enrollmentUrl || institution.website;

  if (!actionUrl) {
    return <span className="institution-name">{institution.name}</span>;
  }

  return (
    <button className="institution-name institution-trigger" type="button" onClick={() => onSelect(institution)}>
      {institution.name}
    </button>
  );
}

function InstitutionList({
  institutions,
  onSelectInstitution
}: {
  institutions: Institution[];
  onSelectInstitution: (institution: Institution) => void;
}) {
  const groups = groupInstitutions(institutions);
  const letters = zelleAlphabet.filter(letter => groups[letter]?.length);

  return (
    <div className="results-list">
      {letters.map(letter => (
        <section className="letter-section" key={letter} aria-labelledby={`letter-${letter}`}>
          <h2 id={`letter-${letter}`}>{letter}</h2>
          <div className="letter-results">
            {groups[letter].map(institution => (
              <InstitutionName key={institution.id} institution={institution} onSelect={onSelectInstitution} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function BankRedirectModal({
  institution,
  onCancel
}: {
  institution: Institution;
  onCancel: () => void;
}) {
  const actionUrl = institution.enrollmentUrl || institution.website;

  if (!actionUrl) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="bank-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bank-modal-title"
        aria-describedby="bank-modal-description"
      >
        <header className="bank-modal-header">
          <h2 id="bank-modal-title">Great News!</h2>
        </header>
        <div className="bank-modal-body">
          <p className="bank-modal-offer">{institution.name} Offers Zelle<sup>®</sup></p>
          {institution.logoUrl ? (
            <img className="bank-modal-logo" src={institution.logoUrl} alt={`${institution.name} logo`} />
          ) : (
            <div className="bank-modal-logo-fallback" aria-hidden="true">
              {institution.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <p id="bank-modal-description" className="bank-modal-primary">
            Your bank offers Zelle<sup>®</sup>! You can use your banking app to send and receive money with Zelle
            <sup>®</sup>.
          </p>
          <p className="bank-modal-disclaimer">
            By selecting "Continue to your bank", you will be taken to an external interface with different privacy and
            information security policy. Zelle<sup>®</sup> is not responsible for and does not endorse the products,
            services or content that is offered or expressed.
          </p>
          <a className="continue-bank-link" href={actionUrl} target="_blank" rel="noreferrer">
            Continue to your bank
          </a>
          <button className="cancel-modal-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </section>
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

function MerchantQrPage() {
  const [form, setForm] = useState<MerchantQrForm>(initialMerchantQrForm);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');
  const isValid = isMerchantQrFormValid(form);
  const merchantQrUrl = buildMerchantQrUrl(form);
  const payload = buildMerchantQrPayload(form);

  useEffect(() => {
    let isMounted = true;

    async function generateQr() {
      const dataUrl = await QRCode.toDataURL(merchantQrUrl, {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 320,
        color: {
          dark: '#1f1b24',
          light: '#ffffff'
        }
      });

      if (isMounted) {
        setQrDataUrl(dataUrl);
      }
    }

    void generateQr();

    return () => {
      isMounted = false;
    };
  }, [merchantQrUrl]);

  function updateForm<K extends keyof MerchantQrForm>(field: K, value: MerchantQrForm[K]) {
    setForm(current => ({ ...current, [field]: value }));
    setCopiedMessage('');
  }

  async function copyQrLink() {
    if (!merchantQrUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(merchantQrUrl);
      setCopiedMessage('Link copied');
    } catch {
      setCopiedMessage('Copy failed');
    }
  }

  function printQr() {
    window.print();
  }

  function downloadQr() {
    if (!qrDataUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${form.name.trim() || 'merchant'}-zelle-qr.png`;
    link.click();
  }

  async function shareQr() {
    if (!merchantQrUrl) {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${form.name.trim()} Zelle QR`,
          text: form.note.trim() || `${form.name.trim()} Zelle QR`,
          url: merchantQrUrl
        });
      } catch {
        return;
      }

      return;
    }

    await copyQrLink();
  }

  return (
    <main className="app-shell merchant-page">
      <header className="brand-header">
        <div className="brand-inner merchant-brand-inner">
          <div className="zelle-lockup" aria-label="Zelle Merchant QR">
            <a className="zelle-home-link" href="https://www.zellepay.com/" target="_blank" rel="noreferrer">
              <img className="zelle-wordmark" src={zelleLogo} alt="Zelle" />
            </a>
            <span className="lockup-divider" aria-hidden="true" />
            <span className="lockup-title">Merchant QR</span>
          </div>
          <Link className="merchant-header-link" to="/">
            Find your bank
          </Link>
        </div>
      </header>

      <section className="merchant-workspace">
        <form className="merchant-form" onSubmit={event => event.preventDefault()}>
          <div className="merchant-form-row">
            <label>
              <span>Name</span>
              <input
                value={form.name}
                onChange={event => updateForm('name', event.target.value)}
                required
                autoComplete="organization"
              />
            </label>

            <label>
              <span>Action</span>
              <select value={form.action} onChange={event => updateForm('action', event.target.value as MerchantQrForm['action'])}>
                <option value="payment">payment</option>
                <option value="request">request</option>
              </select>
            </label>
          </div>

          <label>
            <span>Token</span>
            <input
              value={form.token}
              onChange={event => updateForm('token', event.target.value)}
              required
              autoComplete="email"
              inputMode="email"
            />
          </label>

          <div className="merchant-form-row">
            <label>
              <span>Amount</span>
              <input
                value={form.amount}
                onChange={event => updateForm('amount', event.target.value)}
                min="0.01"
                step="0.01"
                type="number"
              />
            </label>

            <label>
              <span>Currency</span>
              <input
                value={form.currency}
                onChange={event => updateForm('currency', event.target.value.toUpperCase())}
                maxLength={3}
                autoComplete="off"
              />
            </label>
          </div>

          <label>
            <span>Note</span>
            <textarea value={form.note} onChange={event => updateForm('note', event.target.value)} rows={4} />
          </label>
        </form>

        <section className="merchant-preview" aria-label="Generated QR code">
          <div className="print-card">
            <p className="print-card-title">{form.name.trim() || 'Merchant QR draft'}</p>
            <div className="qr-frame">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt={`${form.name.trim() || 'Merchant'} Zelle QR code`} />
              ) : (
                <span>QR preview</span>
              )}
            </div>
            <p className="print-card-note">{form.note.trim() || 'Scan to pay with Zelle'}</p>
          </div>

          <div className="merchant-actions">
            <button type="button" onClick={copyQrLink} disabled={!isValid}>
              <Copy size={18} aria-hidden="true" />
              Copy link
            </button>
            <button type="button" onClick={shareQr} disabled={!isValid}>
              <Share2 size={18} aria-hidden="true" />
              Share
            </button>
            <button type="button" onClick={printQr} disabled={!isValid || !qrDataUrl}>
              <Printer size={18} aria-hidden="true" />
              Print
            </button>
            <button type="button" onClick={downloadQr} disabled={!isValid || !qrDataUrl}>
              <Download size={18} aria-hidden="true" />
              Download
            </button>
          </div>

          {copiedMessage && <p className="merchant-copy-status">{copiedMessage}</p>}

          <div className="merchant-output">
            <label>
              <span>Payload</span>
              <textarea readOnly value={JSON.stringify(payload, null, 2)} rows={8} />
            </label>
            <label>
              <span>QR link</span>
              <textarea readOnly value={merchantQrUrl} rows={4} />
            </label>
          </div>
        </section>
      </section>
    </main>
  );
}

function DirectoryPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
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
        let hasRenderedFirstPage = false;

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

          if (isMounted) {
            setInstitutions([...rows]);

            if (!hasRenderedFirstPage) {
              setIsLoading(false);
              hasRenderedFirstPage = true;
            }
          }
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
          <Link className="merchant-header-link" to="/merchant-qr">
            Merchant QR
          </Link>
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

      {!isLoading && !error && filteredInstitutions.length > 0 && (
        <InstitutionList institutions={filteredInstitutions} onSelectInstitution={setSelectedInstitution} />
      )}

      <ZelleInfoFooter />

      {selectedInstitution && (
        <BankRedirectModal institution={selectedInstitution} onCancel={() => setSelectedInstitution(null)} />
      )}
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
    { path: '/merchant-qr', element: <MerchantQrPage /> },
    { path: '*', element: <NotFound /> }
  ],
  { basename }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
