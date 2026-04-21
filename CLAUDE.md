# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SAP Cloud Application Programming (CAP) full-stack application for managing partner commissions. Uses a Node.js CAP backend with OData v4 services and an SAP UI5 (Fiori) frontend. Database is SAP HANA in production, SQLite for local development.

## Commands

### Development
```bash
npm run watch-partner_commissions   # Start dev server with live reload (primary dev command)
cds watch                           # Alternative: plain CDS watch
```

### Build & Deploy
```bash
npm run build     # Clean and build MTA archive (rimraf + mbt build)
npm run deploy    # Deploy to Cloud Foundry (cf deploy)
npm run undeploy  # Remove from Cloud Foundry with all services
```

### CDS Utilities
```bash
npx cds build --production   # Production build (generates gen/db and gen/srv)
cds-serve                    # Start CDS server (what `npm start` runs)
```

## Architecture

### Three-Layer CAP Structure

**Database layer** (`db/partner_commissions_schema.cds`): CDS entity definitions under the `sz` namespace. Uses `cuid` and `managed` aspects from `@sap/cds/common` for auto-generated IDs and audit fields. Key entities: `PayeeMapping` (86 fields, the main partner record with 16 generic attributes, 6 generic numbers, 6 generic dates, 6 generic booleans), `IncentiveTypes`, `EligibleTiers`, `FieldCustomizations`, `PartnerTypes`.

**Service layer** (`srv/`): `PartnerCommissionsService` exposes entity projections for OData read access and 4 custom actions (`saveIncentiveTypes`, `saveEligibleTiers`, `saveFieldCustomizations`, `savePartnerTypes`). Each action follows a delete-all-then-insert pattern — it wipes the entity table and re-inserts the full payload.

**Frontend** (`app/partner_commissions/webapp/`): SAP UI5 Fiori application (vanilla JavaScript, not React). App ID is `partnercommissions`. Single-page layout with side navigation (sap.tnt) switching between pages via NavContainer. All UI is in two views: `App.view.xml` (shell) and `Main.view.xml` (all pages). Business logic is in `Main.controller.js`.
cal
### Data Flow

1. Frontend fetches config data via OData: `GET /odata/v4/partner-commissions/EntityName`
2. Data is stored in named JSONModels on the controller (e.g., `partners`, `incentiveTypes`, `fieldCustomizations`)
3. User edits are collected in JSONModel, then posted to custom actions via Fetch API: `POST /odata/v4/partner-commissions/saveEntityName`
4. Backend deletes existing records and inserts the full set from the request

### External Integration

TCMP datasource configured at `/tcmp/api/v1/datasphere/consumption/relational/SYZYGYDEV` — SAP Datasphere consumption API for analytics data.

### Build Output

`npx cds build --production` generates `gen/db/` (HANA deployer artifacts) and `gen/srv/` (Node.js service). The MTA build (`mbt build`) packages the UI5 app and generated service for Cloud Foundry deployment.

### Authentication

XSUAA-based auth in production (`xs-security.json`). Routes in `xs-app.json` enforce authentication and CSRF protection for the OData and TCMP endpoints. Auth is disabled in local development.

## Key Conventions

- CDS namespace is `sz` — all entity references in service CDS use `db.EntityName`
- UI5 app namespace is `partnercommissions` (no dots or hyphens)
- Controllers use PascalCase (`Main.controller.js`), entity names use PascalCase (`PayeeMapping`)
- The `FieldCustomizations` entity drives dynamic form/table column visibility and labeling — 49+ fields can be toggled on/off with custom labels
- Chart.js (v4.4.1) is used for analytics visualizations, loaded externally in the UI5 app
- Workspaces: `app/*` is configured as an npm workspace in root `package.json`
