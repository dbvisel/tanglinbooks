# tanglinbooks

Sample deployment is up at https://tanglinbooks.netlify.app/. This could be built and deployed as a static site (by running `npm run build`); deploying on Netlify is really easy.

This is built in NextJS 12 on Node 18. It's pretty straightforward; images are using `next/future/image` which should make updating to Next 13 easier.

## Important for deployment

Environmental variables:
```
- AIRTABLE_API_KEY
- AIRTABLE_BASE_ID
```
These are set in `.env.local` (and probably need to be set in Netlify as well). These come from the Airtable API.

## Todo/done

 * headers/footer/meta/seo? 
 * Airtable has said that they are changing from API key to token-based authentication in the next year. This will need to be updated; but the official Airtable library doesn't seem to support this yet.

## Data in Airtable

This is largely dependent on Airtable column names (and table names, `Table 1`) not being changed. If the column names change, you will have to rework the code. It would be better if this were a bit more abstract? Current headers are:

 - **Title**, how the name is displayed
 - **Title - sort order**, used for alphabetizing 
 - **Subtitle**, may exist, may not
 - **Author - first, last**, how the name is displayed
 - **Author - last, first**, used for sorting
 - **Cover**, the cover image
 - **Series**, may exist, may not
 - **Description - short**, used on the front page
 - **Description - long**, used on the book page
 - **Audience**, a category with controlled vocabulary
 - **List**, a category with controlled vocabulary
 - **Tags**, a category with controlled vocabulary
 - **Format**, a category with controlled vocabulary
 - **Infiniti link**, a URL
 - **Notes**, not used in this
 - **Attachments**, not used in this
 - **Series Link**, not used in this.

These header names appear through the code. The categories get their own types of pages (e.g. `/tag/fiction/` with all books with the tag `fiction`). That could probably be done a bit more abstractly than it currently is!

## Images

Airtable recently changed their API, and images need to be downloaded and cached rather than using them dynamically. This is done by the `scripts/prebuild.js` script (run with `npm run prebuild`), which puts all the images into `/public/images/resources/`. The first time this is run, it will be slow because it's downloading all the images. Once they're downloaded, a list of them is cached, and they will only be downloaded again if the Airtable data changes. You can put these images in the Github repo, which will save a bit of time remotely; though that's run as part of the build step.

There's probably a smarter way to do this?

## Styling

This is done with `styled-components`, though it could be done many other ways. In `/styles/globals.css`, you'll find a bunch of CSS variables setting default colors, for example.