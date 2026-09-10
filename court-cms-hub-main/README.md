# Academy Hub

COMPLETE LOVABLE BUILD PROMPT — NEIGHBOURHOOD ACADEMY BASKETBALL WEBSITE

Build a complete, modern, professional, responsive basketball academy website for:

NEIGHBOURHOOD ACADEMY

The website should look and feel like a real, active, professional basketball academy/team website rather than a generic business website.

The site must be easy to maintain by two non-developer administrators through a secure admin dashboard.

The most important requirement is:

DO NOT HARDCODE WEBSITE CONTENT. Store dynamic content in a database/CMS so that the two administrators can add, edit, replace, and delete content without touching the source code.

1. TECHNOLOGY REQUIREMENTS

If technically possible, use a clean HTML/CSS/JavaScript-based frontend structure, but use whatever modern architecture Lovable recommends if it provides a better result.

The technology choice must NOT compromise the following requirement:

All normal website content must be editable through an admin dashboard without editing the code.

Use a proper backend/database.

If appropriate, use:

Supabase PostgreSQL for the database.

Supabase Authentication for admin login.

Supabase Storage for photos/media.

Row Level Security for database permissions.

Keep frontend code, database content, authentication, and media storage properly separated.

2. WEBSITE STRUCTURE

The website must have three main areas:

MAIN

General Neighbourhood Academy information, including both Boys and Girls.

BOYS

Boys Basketball.

The Boys section contains two leagues:

NBA

NCL

GIRLS

Girls Basketball.

The Girls section contains only:

NCL

These should be clearly accessible from the homepage.

On the homepage, create three prominent cards/buttons:

MAIN

BOYS

GIRLS

When a visitor clicks one, they should enter that specific section.

3. HOMEPAGE

Create a visually impressive homepage.

The homepage should contain:

Header/navigation.

Hero section.

Neighbourhood Academy introduction.

Main/Boys/Girls navigation cards.

Boys NBA preview.

Boys NCL preview.

Girls NCL preview.

Latest results.

Upcoming fixtures.

Latest news.

Team highlights.

Basketball photo/gallery preview.

Sponsors/partners.

Location/map.

Contact section.

Footer.

All dynamic information must come from the database.

4. HERO SECTION

Create a large, professional basketball hero section.

Include:

Neighbourhood Academy name.

Strong basketball-focused headline.

Short introduction.

Call-to-action buttons.

High-quality basketball background/hero image.

Suggested buttons:

Explore Our Teams

Latest News

Contact Us

The hero text and image must be editable through the admin dashboard.

5. BASKETBALL IMAGERY

Make the website visually rich and clearly recognizable as a basketball academy.

Where appropriate, automatically add suitable basketball-related images during the initial build so the website does not look empty or unfinished.

Use high-quality basketball imagery such as:

Basketball action.

Players playing basketball.

Basketball training.

Basketball courts.

Basketball hoops.

Basketballs.

Team huddles.

Coaching.

Match day.

Youth basketball.

Boys basketball.

Girls basketball.

Basketball community/teamwork.

Competition.

Use images strategically.

Do not fill every section with unnecessary images.

The visual style should communicate:

Basketball + Team + Academy + Development + Competition

IMPORTANT IMAGE REQUIREMENT

Any images initially supplied by Lovable should be considered starter/demo imagery.

The administrators must be able to replace them later.

Do NOT hardcode important image URLs into components.

Store dynamic image references in the database/media storage.

Administrators must be able to:

Upload images.

Replace images.

Delete images.

Add captions.

Assign images to sections.

Set featured images.

Create galleries.

6. MAIN SECTION

Create a dedicated Main section.

Include:

About Neighbourhood Academy

Include editable sections for:

Academy introduction.

Mission.

Vision.

Values.

History.

Basketball philosophy.

Youth development.

Community involvement.

All text must be editable through the admin dashboard.

Teams Overview

Show:

Boys Basketball

Include:

Team image.

Description.

League information.

Button to Boys section.

Girls Basketball

Include:

Team image.

Description.

League information.

Button to Girls section.

Latest News

Create a news system.

Administrators must be able to:

Create news.

Edit news.

Delete news.

Add title.

Add content.

Add featured image.

Set publication date.

Select category.

Assign news to Main/Boys/Girls/NBA/NCL.

Publish or save as draft.

Events

Create an events system.

Events should contain:

Event name.

Description.

Date.

Time.

Location.

Image.

Team/category.

Administrators can add/edit/delete events.

Sponsors

Create a sponsors/partners section.

Administrators can:

Add sponsor.

Upload logo.

Add sponsor name.

Add description.

Add website.

Change display order.

Activate/deactivate sponsor.

Delete sponsor.

7. BOYS SECTION

Create a dedicated Boys Basketball section.

The Boys section has exactly two initial leagues:

NBA

NCL

Create a league selector/dropdown:

Boys League ▼

Options:

NBA

NCL

When NBA is selected, display Boys NBA content.

When NCL is selected, display Boys NCL content.

The two leagues must be independent in the database.

8. BOYS NBA

Create a dedicated Boys NBA page.

Include:

Team Header

Team name.

Team photo.

League.

Season.

Description.

Featured basketball image.

Coaches

Display:

Coach photo.

Name.

Role.

Biography.

Administrators can add/edit/delete coaches.

Players

Create professional player cards.

Each player should support:

Name.

Photo.

Jersey number.

Position.

Date of birth/age if desired.

Height if desired.

Biography.

Statistics.

Administrators can add/edit/delete players.

Fixtures

Create a fixtures table:

Date.

Time.

Opponent.

Home/Away.

Venue.

Competition.

Status.

Administrators can add/edit/delete fixtures.

Results

Create results:

Date.

Opponent.

Score.

Home/Away.

Competition.

Match status.

Administrators can manage results.

Standings

Create a league standings table containing:

Position.

Team.

Played.

Won.

Lost.

Points.

Points For.

Points Against.

Difference.

Administrators must be able to manually update standings.

NBA News

Show news related to Boys NBA.

NBA Gallery

Show NBA-related photos.

9. BOYS NCL

Create a dedicated Boys NCL page.

It must function independently from Boys NBA.

Include:

Team information.

Team photo.

Season.

Description.

Coaches.

Players.

Player statistics.

Fixtures.

Results.

Standings.

News.

Gallery.

Match information.

Everything must be editable through the admin dashboard.

10. GIRLS SECTION

Create a dedicated Girls Basketball section.

The Girls section must have only ONE league:

NCL

Do NOT display an NBA option under Girls.

Create a Girls NCL page containing:

Team Header

Team name.

Team image.

League.

Season.

Description.

Basketball hero image.

Coaches

Photo.

Name.

Role.

Biography.

Players

Photo.

Name.

Jersey number.

Position.

Biography.

Optional statistics.

Fixtures

Include:

Date.

Time.

Opponent.

Home/Away.

Venue.

Competition.

Status.

Results

Include:

Date.

Opponent.

Score.

Home/Away.

Competition.

Standings

Include:

Position.

Team.

Played.

Won.

Lost.

Points.

Points For.

Points Against.

Difference.

News

Girls-specific news.

Gallery

Girls-specific photos.

Everything must be editable through the admin dashboard.

11. DATABASE / CMS

Create a proper relational database.

Do NOT hardcode content into the frontend.

Create appropriate tables/collections for:

Site Settings

Fields:

Academy name.

Logo.

Hero image.

Description.

Phone.

Email.

Address.

Latitude.

Longitude.

Map URL.

Social media URLs.

Leagues

Fields:

ID.

Name.

Gender.

Description.

Active/inactive.

Initial data:

Boys:

NBA

NCL

Girls:

NCL

Seasons

Fields:

ID.

Season name.

Start date.

End date.

Active/inactive.

The database must support multiple seasons.

Teams

Fields:

ID.

Team name.

Gender.

League.

Season.

Description.

Team image.

Active/inactive.

Players

Fields:

ID.

Name.

Team.

League.

Gender.

Season.

Jersey number.

Position.

Photo.

Biography.

Statistics.

Active/inactive.

Coaches

Fields:

ID.

Name.

Team.

Role.

Photo.

Biography.

Fixtures

Fields:

ID.

Team.

League.

Season.

Opponent.

Date.

Time.

Venue.

Home/Away.

Competition.

Status.

Results

Fields:

ID.

Team.

League.

Season.

Opponent.

Date.

Score.

Home/Away.

Competition.

Standings

Fields:

ID.

League.

Season.

Team.

Position.

Played.

Won.

Lost.

Points.

Points For.

Points Against.

Difference.

News

Fields:

ID.

Title.

Content.

Featured image.

Category.

Team.

League.

Author.

Publication date.

Status.

Created date.

Updated date.

Statuses:

Draft.

Published.

Archived.

Gallery

Fields:

ID.

Image.

Caption.

Category.

Team.

League.

Season.

Featured.

Upload date.

Events

Fields:

ID.

Name.

Description.

Date.

Time.

Location.

Image.

Team/category.

Sponsors

Fields:

ID.

Sponsor name.

Logo.

Description.

Website.

Display order.

Active/inactive.

Contact Messages

Store:

Name.

Email.

Phone if provided.

Subject.

Message.

Date.

Status.

12. MEDIA STORAGE

Use proper cloud media storage.

Do not store uploaded photos inside the source-code repository.

Administrators should have a media library where they can:

Upload photos.

View photos.

Replace photos.

Delete photos.

Add captions.

Assign categories.

Assign teams.

Assign leagues.

Set featured images.

Optimize images for performance.

Use lazy loading where appropriate.

Use responsive image sizes.

Add proper alt text.

13. ADMIN DASHBOARD

Create a secure /admin dashboard.

There must be exactly two administrator accounts.

Only these two authorized administrators can access the dashboard.

Create a simple CMS interface with:

Dashboard.

Site Settings.

Main Page.

Boys.

Boys NBA.

Boys NCL.

Girls NCL.

Players.

Coaches.

Fixtures.

Results.

Standings.

News.

Gallery.

Media Library.

Events.

Sponsors.

Contact Messages.

14. TWO ADMINISTRATORS

There must be exactly two authorized administrator accounts.

Both administrators should have full content-management permissions.

They can:

Add.

Edit.

Delete.

Publish.

Upload.

Replace.

Manage.

They can manage:

Text.

Photos.

Players.

Coaches.

Teams.

Leagues.

Seasons.

Fixtures.

Results.

Standings.

News.

Events.

Sponsors.

Galleries.

Contact information.

Location.

Social media.

Homepage content.

Normal visitors must NOT be able to access these features.

Do not expose admin credentials in frontend code.

Do not store passwords in plain text.

Use secure authentication.

Use database authorization/security rules.

15. EASY CONTENT EDITING

This is one of the most important requirements.

The website must work like a CMS.

For example, if the homepage says:

"Welcome to Neighbourhood Academy"

an administrator should be able to log in and change it to:

"Welcome to Neighbourhood Academy Basketball"

without touching any source code.

The administrator should simply:

Log in.

Open Main Page.

Edit the text.

Click Save.

The website displays the new content.

The same must apply to images.

An administrator must be able to replace the homepage hero image without editing HTML, JavaScript, CSS, or database code.

16. RICH TEXT EDITOR

Where appropriate, use an easy rich-text editor.

Administrators should be able to:

Write paragraphs.

Bold text.

Italicize text.

Add headings.

Add bullet points.

Add links.

Add images where appropriate.

They should not need to know HTML.

17. MAP / LOCATION

Include an interactive map.

Preferably use Google Maps or another reliable map provider.

Create a Location section containing:

Address.

Interactive map.

Get Directions button.

The location must be editable through the admin dashboard.

Store:

Address.

Latitude.

Longitude.

Map URL if required.

Do NOT hardcode the location.

The administrator should be able to change the location without changing the code.

18. NAVIGATION

Create a professional navigation menu.

Suggested structure:

Home

Main

Boys

NBA

NCL

Girls

NCL

Teams

Fixtures

Results

Standings

News

Gallery

About

Contact

On mobile, use a clean hamburger navigation.

Boys should clearly show NBA and NCL.

Girls should only show NCL.

19. TEAM STATISTICS

Where appropriate, support team/player statistics.

Allow administrators to add statistics manually.

Possible statistics include:

Points.

Rebounds.

Assists.

Steals.

Blocks.

Games played.

Minutes.

Other custom statistics.

Do not require statistics if they are unavailable.

20. MATCH REPORTS

Create an optional match report feature.

Administrators can create a match report containing:

Match title.

Date.

Teams.

Final score.

Summary.

Key moments.

Player highlights.

Photos.

Match reports can appear under news/results.

21. NEWS SYSTEM

Create a professional news system.

News cards should show:

Featured image.

Title.

Date.

Category.

Short excerpt.

Clicking the article opens the full story.

Administrators can create and manage news.

Support:

Main news.

Boys news.

Boys NBA news.

Boys NCL news.

Girls news.

Girls NCL news.

22. GALLERY

Create a professional photo gallery.

Include categories:

All.

Main.

Boys.

Boys NBA.

Boys NCL.

Girls.

Girls NCL.

Training.

Matches.

Events.

Administrators can upload photos and assign categories.

Use a visually appealing gallery layout.

Allow users to open images in a larger/lightbox view.

23. SOCIAL MEDIA

Include social media icons/links.

Possible platforms:

Facebook.

Instagram.

X/Twitter.

YouTube.

TikTok.

Other platforms as required.

Social links must be editable through the admin dashboard.

Do NOT hardcode them.

24. CONTACT FORM

Create a contact form containing:

Name.

Email.

Phone.

Subject.

Message.

Store submissions in the database.

Display a confirmation after successful submission.

Protect the form against spam and malicious input where practical.

Only administrators should be able to view contact submissions.

25. SPONSORS

Create a professional sponsor/partner section.

Display sponsor logos and names.

Allow administrators to:

Add sponsor.

Upload logo.

Add description.

Add website.

Edit sponsor.

Remove sponsor.

Change display order.

Activate/deactivate sponsor.

26. SEASONS

Do not design the database for only one season.

Support future seasons such as:

Administrators should be able to create/select the active season.

Players, teams, fixtures, results, standings, news, and statistics should be associated with seasons where appropriate.

27. FUTURE EXPANSION

The database architecture must be flexible.

Currently:

Boys

NBA

NCL

Girls

NCL

But later the academy may add:

Additional boys leagues.

Additional girls leagues.

Additional teams.

Additional age groups.

Additional seasons.

The architecture should support expansion without rewriting the entire website.

Do not hardcode the assumption that there will always be exactly three teams.

28. RESPONSIVE DESIGN

The entire website must work properly on:

Desktop.

Laptop.

Tablet.

Mobile.

Pay special attention to:

Navigation.

Player cards.

Tables.

Fixtures.

Standings.

Galleries.

Admin dashboard.

On small screens, make standings and fixture tables horizontally scrollable or transform them into mobile-friendly cards.

29. DESIGN STYLE

Create a premium modern basketball aesthetic.

The website should feel:

Energetic.

Competitive.

Professional.

Youth-focused.

Community-focused.

Modern.

Clean.

Use:

Strong typography.

Basketball imagery.

Player cards.

Team cards.

Clean tables.

Modern buttons.

Subtle animations.

Professional spacing.

High-quality photography.

Do not make it look like a generic corporate template.

30. ACCESSIBILITY

Implement good accessibility practices.

Include:

Proper heading hierarchy.

Alt text for images.

Keyboard navigation.

Accessible buttons.

Good contrast.

Proper form labels.

Accessible navigation.

Responsive text.

31. SEO

Implement proper SEO.

Include:

Page titles.

Meta descriptions.

SEO-friendly URLs.

Open Graph metadata.

Proper heading structure.

Image alt text.

Sitemap where appropriate.

Structured data where appropriate.

Allow administrators to edit SEO title/description fields where practical.

32. PERFORMANCE

Optimize for fast loading.

Use:

Optimized images.

Responsive images.

Lazy loading.

Efficient database queries.

Appropriate caching.

Minimal unnecessary JavaScript.

Do not load massive images unnecessarily.

33. SECURITY

Security is important.

Implement:

Secure administrator authentication.

Protected admin routes.

Database authorization.

Row Level Security where applicable.

Secure file uploads.

Input validation.

Protection against unauthorized database writes.

Secure environment variables.

No passwords in source code.

No database credentials in frontend code.

Public visitors should have read-only access to published website content.

Only authenticated administrators should be able to modify content.

34. DATABASE SECURITY

Database permissions must actually enforce the rules.

Do not rely only on hiding buttons in the frontend.

Public users:

Can read published public content.

Can submit contact forms.

Administrators:

Can create.

Can read.

Can update.

Can delete.

Can manage media.

Only the two authorized administrator accounts should have content-management privileges.

35. ADMIN DASHBOARD EXAMPLE

The admin dashboard should be simple enough for a non-developer.

For example:

Boys → NBA → Players

Display:

+ Add Player

Then:

Player Name
[________________]

Jersey Number
[________________]

Position
[________________]

Photo
[Upload Photo]

Biography
[Rich Text Editor]

Statistics
[________________]

Status
[Active ▼]

[ Save Player ]

The same simple principle should be used for:

News.

Fixtures.

Results.

Standings.

Coaches.

Galleries.

Sponsors.

Events.

Teams.

Site settings.

36. ADMIN IMAGE WORKFLOW

The administrator should be able to:

Log in.

Open Media Library.

Click Upload.

Select a photo.

Upload it.

Add caption/category.

Assign it to a team/league.

Save.

Website automatically displays the image.

No code changes should be required.

37. ADMIN TEXT WORKFLOW

The administrator should be able to:

Log in.

Open the relevant page.

Find the text.

Edit it.

Click Save.

Website automatically displays the updated text.

No code changes should be required.

38. FOOTER

Create a professional footer containing:

Neighbourhood Academy name/logo.

Short description.

Main navigation.

Boys NBA.

Boys NCL.

Girls NCL.

Contact details.

Location.

Social media.

Sponsors where appropriate.

Copyright.

The copyright year should update automatically.

39. INITIAL CONTENT

Populate the website with realistic starter content so the design can be properly previewed.

However, clearly structure the content as database-driven content.

Do not permanently hardcode placeholder content.

Use realistic sample basketball information where actual academy information has not yet been provided.

The administrators will later replace the sample information through the admin dashboard.

40. INITIAL BASKETBALL IMAGES

During the initial build, use suitable basketball imagery throughout the website so the site looks complete.

Include appropriate images for:

Homepage hero.

Main/About section.

Boys section.

Boys NBA.

Boys NCL.

Girls section.

Girls NCL.

Training.

Matches.

News.

Gallery.

Team cards.

Use basketball-related imagery that fits each section.

For Boys sections, use appropriate boys/men's basketball imagery.

For Girls sections, use appropriate girls/women's basketball imagery.

Avoid unrelated stock photography.

IMPORTANT:

These are initial images only.

All important images must be replaceable by administrators through the CMS/media library.

41. DO NOT HARDCODE DYNAMIC CONTENT

This requirement is extremely important.

Do NOT hardcode:

Player names.

Player photos.

Coach names.

Coach photos.

Fixtures.

Results.

Standings.

News.

Events.

Sponsors.

Contact details.

Social media links.

Location.

Team descriptions.

League descriptions.

Homepage content.

Gallery images.

These should come from the database/CMS.

The frontend should primarily act as the presentation layer.

42. DATA RELATIONSHIPS

Create proper relationships between:

Seasons.

Teams.

Leagues.

Players.

Coaches.

Fixtures.

Results.

Standings.

News.

Galleries.

Events.

For example:

Boys → NBA → 2026 Season → Players

should only show the players associated with that team/league/season.

Likewise:

Girls → NCL → 2026 Season

should only show the relevant Girls NCL content.

43. TESTING

Before considering the website complete, test the following.

Public website

Confirm:

Homepage works.

Main works.

Boys works.

Girls works.

Boys NBA works.

Boys NCL works.

Girls NCL works.

League selector works.

Navigation works.

Mobile navigation works.

Players work.

Coaches work.

Fixtures work.

Results work.

Standings work.

News works.

Gallery works.

Sponsors work.

Contact form works.

Map works.

Social links work.

Admin

Confirm:

Two administrator accounts work.

Admin login works.

Unauthorized users cannot access admin.

Admins can edit homepage text.

Admins can upload images.

Admins can replace images.

Admins can delete images.

Admins can add players.

Admins can edit players.

Admins can delete players.

Admins can manage coaches.

Admins can manage fixtures.

Admins can manage results.

Admins can manage standings.

Admins can manage news.

Admins can manage galleries.

Admins can manage events.

Admins can manage sponsors.

Admins can update contact information.

Admins can update location.

Admins can update social media links.

Most importantly:

Verify that normal content changes do not require editing or touching the source code.

44. PRODUCTION-READY REQUIREMENT

Build the complete working website, not just a visual mockup.

Do not leave major functionality as fake buttons or non-functional placeholders.

If an external service requires:

API key.

Environment variable.

Authentication configuration.

Map key.

Database configuration.

Clearly identify what needs to be configured and where.

Never expose secrets in frontend code.

45. FINAL ARCHITECTURE GOAL

The finished website should work like this:

VISITOR

Visitor opens:

Neighbourhood Academy

↓

Chooses:

MAIN | BOYS | GIRLS

↓

If BOYS:

NBA | NCL

↓

If GIRLS:

NCL

↓

Visitor can view:

Teams.

Players.

Coaches.

Fixtures.

Results.

Standings.

News.

Photos.

Events.

Contact information.

Location.

ADMINISTRATOR

Administrator opens:

/admin

↓

Logs in securely.

↓

Sees dashboard.

↓

Can manage:

Website Content

Teams

Leagues

Seasons

Players

Coaches

Fixtures

Results

Standings

News

Gallery

Media

Events

Sponsors

Contact

Location

Social Media

↓

Changes are saved to the database.

↓

Public website automatically displays the updated information.

FINAL INSTRUCTION TO LOVABLE

Build Neighbourhood Academy as a complete, professional basketball academy website with a database-backed CMS and secure two-administrator management system.

The website must initially contain:

MAIN

General academy information + Boys + Girls.

BOYS

NBA

NCL

GIRLS

NCL

Use basketball imagery throughout the website where appropriate.

Make the website visually impressive, professional, responsive, and basketball-focused.

Most importantly:

I must be able to manage the website's normal content, photos, teams, players, fixtures, results, standings, news, sponsors, events, social links, and location from the admin dashboard without touching the source code.

There must be exactly two authorized administrators, both with full content-management permissions.

Use a secure database, authentication, media storage, and database security policies.

Design the architecture so that the academy can add more teams, leagues, and seasons in the future without rebuilding the entire website.

Do not build only a frontend mockup.

Build the actual functional website, database, authentication, CMS/admin dashboard, media management, and public-facing pages. ensure the colors of the background are appealing and attractive and test first if the admin is functioning and allow only 2 access for the admin who can change the website

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://court-cms-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f3c5d706-b842-4582-bac8-2a291ea9259c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
