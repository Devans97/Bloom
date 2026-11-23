/** Extracted rows are proposals only. A learner must review each date and subject. */
export interface PlannerCandidate {
  id: string;
  title: string;
  day: string;
  subject: string;
  coverage: string[];
  source: string;
  warnings: string[];
  selected: boolean;
}

const monthNames = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const monthPattern = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';
const aliases: [string, RegExp][] = [
  ['pe', /\b(?:physical\s*education|physical\s*ed\.?|p\.?\s*e\.?(?=\s|$)|048|yoga|computer\s*science\s*\/\s*pe|c\.?s\.?\s*\/\s*pe)\b/i],
  ['physics', /\b(?:physics|phy\.?|042)\b/i],
  ['chemistry', /\b(?:chemistry|chem\.?|043)\b/i],
  ['math', /\b(?:mathematics|maths?|041)\b/i],
  ['english', /\b(?:english(?:\s*core)?|eng\.?|301)\b/i],
];

export function inferAcademicDate(rowText: string): string {
  const m = rowText.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\b/);
  if (!m) return '';
  const dayNum = parseInt(m[1], 10);
  const monthStr = m[2].toLowerCase().slice(0, 3);
  const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const monthIdx = months.indexOf(monthStr);
  if (monthIdx === -1) return '';
  const year = monthIdx >= 5 ? 2026 : 2027;
  const iso = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
  return validPlannerDate(iso) ? iso : '';
}

export function validPlannerDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y,m,d] = value.split('-').map(Number);
  if (y < 2000 || y > 2100) return false;
  const dt = new Date(Date.UTC(y,m-1,d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m-1 && dt.getUTCDate() === d;
}

const iso = (d: number,m: number,y: number) => {
  const value = [String(y).padStart(4,'0'),String(m).padStart(2,'0'),String(d).padStart(2,'0')].join('-');
  return validPlannerDate(value) ? value : '';
};
const monthNumber = (value: string) => monthNames.findIndex(x => x.startsWith(value.toLowerCase().slice(0,3)))+1;

/** No current-year inference: an explicit year or a single document heading year is required. */
export function parsePlannerText(text: string): PlannerCandidate[] {
  const clean = text.replace(/\r\n?/g,'\n').replace(/\u00a0/g,' ');
  const yearMatches = [...clean.matchAll(/\b(20\d{2})\b/g)].map(x=>Number(x[1]));
  const years = [...new Set(yearMatches)];
  // A heading can supply a year for shortened row dates, but not a heading such as 2026–27.
  const headingYear = years.length === 1 && !/\b20\d{2}\s*[–—\/-]\s*(?:20)?\d{2}\b/.test(clean) ? years[0] : undefined;
  const lines = clean.split('\n').map(x=>x.replace(/[\t ]+/g,' ').trim()).filter(Boolean);
  let headingMonth: number | undefined;
  const candidates: PlannerCandidate[] = [];

  for (const [index,line] of lines.entries()) {
    const namedHeading = line.match(new RegExp('^'+monthPattern+'(?:\\s+(20\\d{2}))?(?:\\s+(?:test|planner|schedule|assessment)[\\w\\s]*)?$', 'i'));
    if (namedHeading) headingMonth = monthNumber(namedHeading[0]);
    const foundSubjects = aliases.filter(([,re])=>re.test(line)).map(([id])=>id);
    // Avoid treating the list of subjects in a header as a row.
    if (!foundSubjects.length) continue;
    let day = '', usedDocumentYear = false, dateSeen = false, dateAmbiguous = false;
    const isoMatch = line.match(/\b(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})\b/);
    const numericMatch = line.match(/\b(\d{1,2})[/.\-](\d{1,2})(?:[/.\-](20\d{2}|\d{2}))?\b/);
    const namedMatch = line.match(new RegExp('\\b(\\d{1,2})(?:st|nd|rd|th)?\\s*[- ]\\s*('+monthPattern+')(?:[, ]+\\s*(20\\d{2}))?\\b','i'));
    const reverseNamed = line.match(new RegExp('\\b('+monthPattern+')\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:,?\\s+(20\\d{2}))?\\b','i'));
    if (isoMatch) {
      dateSeen = true;
      day = iso(Number(isoMatch[3]),Number(isoMatch[2]),Number(isoMatch[1]));
    } else if (namedMatch || reverseNamed) {
      dateSeen = true;
      const date = namedMatch ?? reverseNamed!;
      const y = date[3] ? Number(date[3]) : headingYear;
      const m = monthNumber(namedMatch ? date[2] : date[1]);
      const d = Number(namedMatch ? date[1] : date[2]);
      usedDocumentYear = !date[3] && Boolean(y);
      if (y) day = iso(d,m,y);
    } else if (numericMatch) {
      dateSeen = true;
      // DD/MM is the expected school-planner format; require review when both numbers fit a month.
      const d = Number(numericMatch[1]), m = Number(numericMatch[2]);
      const explicit = numericMatch[3];
      const y = explicit ? Number(explicit.length === 2 ? '20'+explicit : explicit) : headingYear;
      usedDocumentYear = !explicit && Boolean(y);
      dateAmbiguous = d<=12 && m<=12 && d!==m;
      if (y) day = iso(d,m,y);
    } else if (headingMonth) {
      const short = line.match(/^(\d{1,2})(?:st|nd|rd|th)?\s*[|,:–—-]?\s+(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)?/i);
      if (short) {
        dateSeen = true;
        usedDocumentYear = Boolean(headingYear);
        if (headingYear) day = iso(Number(short[1]),headingMonth,headingYear);
      }
    }
    if (!dateSeen) continue;
    const subject = foundSubjects.length===1 ? foundSubjects[0] : '';
    const warnings: string[] = [];
    if (!day) warnings.push('Date needs your correction; no complete valid date was found.');
    if (usedDocumentYear) warnings.push('Year taken from the document heading. Check it.');
    if (dateAmbiguous) warnings.push('Read as DD/MM. Check the date order.');
    if (!subject) warnings.push('More than one subject found. Choose the right subject.');
    candidates.push({id:`row-${index}`,title:line.slice(0,100),day,subject,coverage:[],source:line,warnings,selected:Boolean(day&&subject)});
  }
  // Preserve source rows, so an apparent repeat stays visible for review instead of silently disappearing.
  return candidates;
}

export const plannerIdentity = (test: {day:string;subject:string;title:string}) =>
  `${test.day}|${test.subject}|${test.title.trim().toLocaleLowerCase().replace(/\s+/g,' ')}`;
