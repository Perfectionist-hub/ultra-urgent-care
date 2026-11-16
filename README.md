# Ultra Urgent Care & Pain Management

A patient site for the Chicago (95th Street) and Hoffman Estates clinics, plus a print-ready flyer and a staff playbook. It replaces the crowded single-page site and the Hoffman-only flyer with one clear offer: walk in for urgent care, call for pain and video psychiatry, and check which door is open.

## Run it locally

```bash
npm install
npm run dev
```

The dev server listens on port 3847. Pages worth opening first:

- `/` — hours that follow Chicago time, and the three ways to be seen
- `/flyer` — letter-size flyer, then use Print or save as PDF
- `/campaign` — one-page, four-phase campaign for a presentation
- `/book` — request a time; the clinic confirms by phone, and nothing is stored
- `/what-we-treat` — clickable problems that open the booking form
- `/insurance` — what to ask before you come, including self-pay
- `/reviews` — links to each clinic’s Google listing
- `/visit` — callback script that stays on the device
- `/playbook` — the 90-day marketing plan for the practice

The front-desk chat is on every page. It answers from the clinic facts in `src/lib/clinic.ts` and does not send messages to a server or to an outside model. EN / ES in the header switches the pages, and a link can open in Spanish with `?lang=es`. The chat answers in the language of the question. The flyer prints both languages on one sheet. The 90-day checklist in the internal marketing canvas is for the practice, not a public page.

## What is intentionally not here

- No stored appointment requests. The form opens the phone or the visitor’s own email app.
- No invented wait times, award badges, star scores, or patient quotes. Google reviews stay on each clinic’s map listing. The previous site included a Sunday review while the published hours say Sunday is closed.
- No diagnosis in the chat. Emergencies are pointed to 911, and a crisis is pointed to 911 and 988.

Hours, phones, services, and clinician notes come from the practice’s public site and flyer. Confirm 95th Street is seeing patients before advertising that door: the organization NPI on file is Hoffman Estates.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm start
```
