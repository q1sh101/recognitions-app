# Recognitions (Rails 8 + Vite)

Minimal employee recognitions app with simple email/password auth.
Frontend is bundled by **Vite**; styles via **Bootstrap 5**; live reload in dev.

## Tech Stack
Rails 8 (Ruby 3.3)
SQLite (dev/test)
Sass via dartsass-rails
Vite (JS/CSS bundling) + Bootstrap 5 (basic layout only)
bcrypt (simple auth)
Hotwire (Turbo/Stimulus) 

---
## Prerequisites
Install/asdf (recommended) or have these available:
Ruby 3.3.7 (see `.ruby-version`)
Node.js 22.x (see `.tool-versions`)
Bundler (comes with recent Rubies)
SQLite 3
Foreman gem (auto-installed by `bin/dev` if missing)

Confirm versions:
`ruby -v`
`node -v`
`sqlite3 --version`

## Initial Setup
Clone repo then run:
`bundle install`
`npm install`
`bin/rails db:setup` (creates, migrates, seeds) OR run individually:
`bin/rails db:create`
`bin/rails db:migrate`
`bin/rails db:seed`

Seeds create:
- Users: alice@example.com, bob@example.com, carol@example.com (password: `password`)
- Badges: Team Player, Innovator, Customer Hero, Mentor
- One sample recognition

---
## Running the App (Dev)
Preferred (starts Rails, Vite, Sass watchers):
`bin/dev`

Then visit: http://localhost:3000

If you need to run pieces manually:
`bin/rails server`
`npx vite`
`bin/rails dartsass:watch`

---
## Authentication
Very minimal sessions-based auth.
Login path: `/login`
Logout: form/button triggering DELETE `/logout`
Session stored via `session[:user_id]`.
Model: `User` with `has_secure_password` (bcrypt backed).
No password reset, confirmation, or lockouts—keep it simple.

---
## Core Domain Models
User: name, email (unique), password_digest
Badge: name, slug (unique)
Recognition: sender_id, recipient_id, badge_id, message

Associations:
- User has many sent/received recognitions
- Recognition belongs to sender (User), recipient (User), badge

---
## Front-End Entrypoint (Vite)
Entry JS: `app/frontend/entrypoints/application.js (imports Bootstrap; initializes Hotwire Turbo: import * as Turbo from "@hotwired/turbo"; window.Turbo = Turbo)`
Styles: `app/frontend/entrypoints/styles.scss (imports @import "bootstrap/scss/bootstrap"; + minimal custom CSS)`
Layout: `app/views/layouts/application.html.erb` uses `vite_client_tag` + `vite_javascript_tag`.
Layout: `app/views/layouts/application.html.erb` uses `vite_client_tag` + `vite_stylesheet_tag 'styles.scss'` + `vite_javascript_tag 'application'`.

---
---
## Quick Start (Copy/Paste)
`bundle install && npm install && bin/rails db:setup && bin/dev`

Login with: alice@example.com / password

---
### Contributing

**🔮[Giorgi Kishmareia](https://github.com/q1sh101)**  

---
**Happy building**  

