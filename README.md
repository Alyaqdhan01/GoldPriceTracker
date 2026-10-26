# Gold Price Tracker API & OmanGoldTracker

A gold-price tracking project consisting of an **ASP.NET Core Web API** backend and an **Angular** frontend. The API provides sample gold prices by karat, and the Angular dashboard retrieves and displays them.

> **Data note:** The project uses sample prices stored in the application. Prices are for demonstration only and are not live market prices.

## Project structure

The projects can be kept in separate folders or repositories:

```text
GoldPriceTracker/
├── GoldPriceTracker.Api/   # ASP.NET Core Web API (C#)
└── OmanGoldTracker/        # Angular frontend
```

Your actual folder layout may differ. Use the paths where you saved each project.

## Features

### ASP.NET Core Web API
- Retrieve all available gold prices.
- Retrieve the price for a specific karat.
- Return `404 Not Found` when a requested karat is unavailable.
- Keep sample prices in application memory; no database is required.
- Use controller-based API endpoints.
- Provide Swagger/OpenAPI documentation when enabled by the project configuration.
- Optionally expose historical sample prices through a `history` endpoint.

### Angular frontend
- Display prices for gold karats such as 18K, 21K, 22K, and 24K.
- Calculate an estimated gold value from a selected karat and weight.
- Display a price trend and price history when the API history endpoint is enabled.
- Support Arabic RTL layout and responsive screens.
- Provide language and light/dark controls if included in the current version.

## Requirements

Install the following before running the projects:

- **.NET SDK 10.0** (or the SDK version specified by the API project's target framework).
- **Node.js and npm**, compatible with your Angular version.
- Angular CLI, if you want to use the `ng` command globally.

Check installations:

```bash
dotnet --version
node --version
npm --version
ng version
```

If Angular CLI is not installed globally, you can use `npx ng` instead of `ng`.

## Run the API

1. Open a terminal in the folder containing `GoldPriceTracker.Api.csproj`.
2. Restore packages and run the application:

```bash
dotnet restore
dotnet run
```

3. Check the terminal output for the actual HTTP/HTTPS address assigned to the API. The examples below assume the API is running at:

```text
http://localhost:5244
```

If your terminal shows a different port, use that address in the requests and update the Angular service accordingly.

### API endpoints

Base URL used in the examples: `http://localhost:5244`

| HTTP method | Endpoint | Description | Expected response |
|---|---|---|---|
| `GET` | `/api/GoldPrices` | Get all available sample gold prices | `200 OK` |
| `GET` | `/api/GoldPrices/24` | Get the price for 24K gold | `200 OK` when available |
| `GET` | `/api/GoldPrices/22` | Get the price for 22K gold | `200 OK` when available |
| `GET` | `/api/GoldPrices/21` | Get the price for 21K gold | `200 OK` when available |
| `GET` | `/api/GoldPrices/18` | Get the price for 18K gold | `200 OK` when available |
| `GET` | `/api/GoldPrices/15` | Example of an unsupported karat | `404 Not Found` |
| `GET` | `/api/GoldPrices/history` | Get sample price history, if enabled | `200 OK` when enabled |

The supported karats depend on the sample data in the API. An unsupported karat should return `404 Not Found`.

### Test with Swagger

When Swagger is enabled, open the Swagger URL shown by the API project's launch settings or terminal output. A common development URL is:

```text
http://localhost:5244/swagger
```

The exact URL can differ by environment. In Swagger, expand an endpoint, select **Try it out**, enter any required values, and select **Execute**. Verify the status code and response body.

### Example request

```bash
curl http://localhost:5244/api/GoldPrices
```

Example shape of a response (actual field names and values depend on the model and sample data):

```json
[
  {
    "karat": "24",
    "price": 49.6
  }
]
```

## Run the Angular frontend

1. Open a **separate terminal** in the `OmanGoldTracker` folder (the folder containing `package.json`).
2. Install dependencies and start the development server:

```bash
npm install
ng serve
```

If Angular CLI is not installed globally, run:

```bash
npm install
npx ng serve
```

3. Open the local URL shown in the terminal. Angular commonly uses:

```text
http://localhost:4200
```

Keep both the API and Angular development server running while using the dashboard.

## Connect Angular to the API

The Angular service is expected to use the API base URL. In the current project, check:

`src/app/services/gold-price.service.ts`

The configured URL should match the address printed when the API starts. For example:

```ts
private apiUrl = 'http://localhost:5244/api/GoldPrices';
```

The service can expose methods such as:

- `getAllPrices()` — retrieves all prices.
- `getPriceByKarat(karat)` — retrieves a single karat price.
- `getHistory()` — retrieves sample history if the API implements that endpoint.

If the API uses a different port, update the URL in the service. If the browser reports a CORS error, confirm that the API allows requests from the Angular development origin (commonly `http://localhost:4200`).

## Build and verify

Run these commands from the appropriate project folders.

**Build the API:**

```bash
dotnet build
```

**Build the Angular application:**

```bash
ng build
```

Before submitting, verify that:
- The API starts successfully.
- Swagger lists the expected endpoints and each endpoint returns the expected status code.
- The Angular dashboard displays data fetched from the API rather than duplicated hardcoded UI data.
- The API URL and CORS origin match your local setup.
- Both projects build without errors.

## GitHub submission

Upload the API and Angular source code to GitHub. You can use one repository containing both folders or two separate repositories. Make sure the README's folder paths and run commands match the repository layout.

Do not commit passwords, API keys, private configuration, `node_modules`, build output, or generated folders such as `bin`, `obj`, `dist`, and `.angular`.

## Limitations

- Prices are sample data and are not guaranteed to match the real gold market.
- No database is required; sample data is stored in the application.
- The history endpoint is an optional extension and should only be documented as available if it exists in the API controller.
