// DNI identity verification for Yala buyers — the platform's trust pillar:
// a buyer must verify their DNI before bidding or buying.
//
// The Spring backend has NO identity endpoint, so we validate the DNI against
// RENIEC through Didit's Database Validation API:
//   POST https://verification.didit.me/v3/database-validation/
//   header: x-api-key: <secret>
//   body:   { issuing_state:"PER", services:"per_dni", personal_number, first_name?, last_name? }
//   resp:   { status:"Approved"|"Declined", match_type:"full_match"|"no_match",
//             validations:[{ outcome_code:"MATCH"|"NO_MATCH"|"DOCUMENT_NOT_FOUND" }] }
//
// Didit is server-to-server (secret key, no browser CORS), so we never call it
// from the browser. The Vite dev proxy (see vite.config.js) forwards /didit/*
// to Didit and injects the x-api-key on the Node side — the app just calls the
// same-origin path below.
//
// If no DIDIT_API_KEY is set on the proxy, Didit answers 401/403 and we fall back
// to a local demo check (valid 8-digit DNI -> approved) so the flow still works
// in a presentation without a key.

const ENDPOINT = '/didit/v3/database-validation/';

function makeResult(partial: any) {
  return {
    verified: false,
    source: 'demo', // 'didit' | 'demo'
    status: null, // Didit: 'Approved' | 'Declined'
    matchType: null, // Didit: 'full_match' | 'no_match'
    outcome: null, // Didit: 'MATCH' | 'NO_MATCH' | 'DOCUMENT_NOT_FOUND'
    reason: null, // why we ended up in demo mode / what failed
    raw: null,
    ...partial,
  };
}

function demoResult(personalNumber: string, reason?: string) {
  return makeResult({ verified: /^\d{8}$/.test(personalNumber), source: 'demo', reason });
}

/**
 * Verify a Peruvian DNI.
 * @param {{ dni: string, firstName?: string, lastName?: string }} input
 * @returns {Promise<{verified:boolean, source:string, status:?string, matchType:?string, outcome:?string, reason:?string, raw:?object}>}
 */
export async function verifyDni({ dni, firstName = '', lastName = '' }: { dni: string; firstName?: string; lastName?: string }) {
  const personalNumber = String(dni || '').replace(/\D/g, '');
  if (!/^\d{8}$/.test(personalNumber)) {
    return makeResult({ verified: false, source: 'demo', reason: 'invalid-format' });
  }

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuing_state: 'PER',
        services: 'per_dni',
        personal_number: personalNumber,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
      }),
    });
  } catch {
    // Proxy unreachable (e.g. a static build with no Node dev server) -> demo.
    return demoResult(personalNumber, 'proxy-unreachable');
  }

  // No API key configured on the proxy -> Didit rejects auth -> demo mode.
  if (res.status === 401 || res.status === 403) {
    return demoResult(personalNumber, 'no-api-key');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    return makeResult({ verified: false, source: 'didit', reason: 'http-error', raw: data });
  }

  // Real Didit responses nest the verdict under `database_validation`; fall back
  // to the top level in case a flatter shape is ever returned.
  const dv = (data && data.database_validation) || data || {};
  const outcome =
    Array.isArray(dv.validations) && dv.validations[0]
      ? dv.validations[0].outcome_code
      : null;
  const verified = dv.status === 'Approved' || outcome === 'MATCH';

  return makeResult({
    verified,
    source: 'didit',
    status: dv.status || null,
    matchType: dv.match_type || null,
    outcome,
    raw: data,
  });
}
