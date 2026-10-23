# Student ticket refund page

`/ticket-refund` is a hidden page for accepted hackers who already bought a
Student Ticket on Luma. It walks them through messaging the host and cancelling
the ticket so we can refund it. Link it from hacker acceptance emails:

https://hackathon.tum-blockchain.com/ticket-refund

- Not in the nav or footer, and served with `noindex, nofollow`.
- Copy lives in `src/content/ticket-refund.ts`; the page is
  `src/app/ticket-refund/page.tsx`.
- Screenshots are in `public/ticket-refund/` (Luma desktop site, October 2026).
  Retake them if Luma changes its event page or cancel dialog.
